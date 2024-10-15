import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from '../files/files.service';
import { Education } from './education.model';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';

@Injectable()
export class EducationService {
  constructor(
    @InjectModel(Education) private educationRepository: typeof Education,
    private fileService: FilesService,
  ) {}

  async create(dto: CreateEducationDto, files: any[]) {
    if (files.length) {
      let image = '';
      let contentImages1 = '';
      let contentImages2 = '';
      await Promise.all(
        files.map(async (file) => {
          const fileName = await this.fileService.createFile(file);
          if (file.fieldname === 'contentImages1[]') {
            contentImages1 = contentImages1
              ? contentImages1 + ',' + fileName
              : fileName;
          }
          if (file.fieldname === 'contentImages2[]') {
            contentImages2 = contentImages2
              ? contentImages2 + ',' + fileName
              : fileName;
          }
          if (file.fieldname === 'image[]') {
            image = fileName;
          }
        }),
      );

      const education = await this.educationRepository.create({
        ...dto,
        image,
        contentImages1,
        contentImages2,
      });
      return education;
    }

    return 'error';
  }

  async findAll() {
    return await this.educationRepository.findAll({
      order: [['createdAt', 'DESC']],
    });
  }

  async delete({ id, deletedImages }: { id: string; deletedImages: string }) {
    const images = deletedImages.split(',');

    const deletedCount = await this.educationRepository.destroy({
      where: { id },
    });
    for (const image of images) {
      await this.fileService.deleteFile(image);
    }
    if (deletedCount === 0) {
      throw new Error(`education with id ${id} not found`);
    }

    return await this.findAll();
  }

  async findOne(id: string) {
    return await this.educationRepository.findOne({
      rejectOnEmpty: undefined,
      where: { id },
    });
  }

  async update(dto: UpdateEducationDto, files: any, id: string) {
    const { image, contentImages1, contentImages2, deletedFiles, ...res } = dto;
    const newImage = [];
    const newContentImages1 = [];
    const newContentImages2 = [];
    const education = await this.educationRepository.findByPk(id);

    if (deletedFiles?.length) {
      for (const file of deletedFiles) {
        await this.fileService.deleteFile(file);
      }
    }

    if (!education) {
      throw new Error(`employee with id ${id} not found`);
    }

    if (image?.length) {
      newImage.push(image);
    }
    if (contentImages1?.length) {
      newContentImages1.push(contentImages1);
    }
    if (contentImages2?.length) {
      newContentImages2.push(contentImages2);
    }

    await Promise.all(
      files.map(async (file) => {
        const fileName = await this.fileService.createFile(file);
        if (file.fieldname === 'contentImages1[]') {
          newContentImages1.push(fileName);
        }
        if (file.fieldname === 'contentImages2[]') {
          newContentImages2.push(fileName);
        }
        if (file.fieldname === 'image[]') {
          newImage.push(fileName);
        }
      }),
    );

    await this.educationRepository.update(
      {
        ...res,
        contentImages2: newContentImages2.length
          ? newContentImages2.join(',')
          : '',
        contentImages1: newContentImages1.length
          ? newContentImages1.join(',')
          : '',
        image: newImage.length ? newImage.join(',') : '',
      },
      { returning: undefined, where: { id } },
    );

    return await this.educationRepository.findByPk(id);
  }
}
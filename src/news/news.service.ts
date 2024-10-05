import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { News } from './news.model';
import { CreateCooperationDto } from '../cooperation/dto/create-cooperation.dto';
import { FilesService } from '../files/files.service';
import { UpdateEmployeesDto } from '../employees/dto/update-employees.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(News) private newsRepository: typeof News,
    private fileService: FilesService,
  ) {}

  async create(dto: any, files: any[]) {
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

      const news = await this.newsRepository.create({
        ...dto,
        image,
        contentImages1,
        contentImages2,
      });
      return news;
    }

    return 'error';
  }

  async findAll() {
    return await this.newsRepository.findAll({
      order: [['createdAt', 'DESC']],
    });
  }

  async delete({ id, deletedImages }: { id: string; deletedImages: string }) {
    const images = deletedImages.split(',');

    const deletedCount = await this.newsRepository.destroy({
      where: { id },
    });
    for (const image of images) {
      await this.fileService.deleteFile(image);
    }
    if (deletedCount === 0) {
      throw new Error(`Cooperation with id ${id} not found`);
    }

    return await this.findAll();
  }

  async findOne(id: string) {
    return await this.newsRepository.findOne({
      rejectOnEmpty: undefined,
      where: { id },
    });
  }

  async update(dto: UpdateNewsDto, files: any, id: string) {
    const { image, contentImages1, contentImages2, deletedFiles, ...res } = dto;
    const newImage = [];
    const newContentImages1 = [];
    const newContentImages2 = [];
    const news = await this.newsRepository.findByPk(id);

    if (deletedFiles?.length) {
      for (const file of deletedFiles) {
        await this.fileService.deleteFile(file);
      }
    }

    if (!news) {
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

    await this.newsRepository.update(
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

    return await this.newsRepository.findByPk(id);
  }
}

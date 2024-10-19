import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Department } from './department.model';
import { FilesService } from '../files/files.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel(Department) private departmentRepository: typeof Department,
    private fileService: FilesService,
  ) {}
  async findAll() {
    return await this.departmentRepository.findAll({
      order: [['createdAt', 'DESC']],
    });
  }

  async findOne(id: string) {
    const where: any = {};

    if (!isNaN(Number(id))) {
      where.id = id;
    } else {
      where.slug = id;
    }
    const department = await this.departmentRepository.findOne({
      rejectOnEmpty: undefined,
      where,
    });

    if (department) {
      return department;
    }
    throw new HttpException('department not found', HttpStatus.NOT_FOUND);
  }

  async create(dto: CreateDepartmentDto, files: any[]) {
    let attachedFiles = '';
    let contentImages1 = '';
    let contentImages2 = '';
    if (files.length) {
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
          if (file.fieldname === 'attachedFiles[]') {
            attachedFiles = attachedFiles
              ? attachedFiles + ',' + fileName
              : fileName;
          }
        }),
      );
    }
    const department = await this.departmentRepository.create({
      ...dto,
      attachedFiles,
      contentImages1,
      contentImages2,
    });
    return department;

    throw new HttpException('somting wrong try agean', HttpStatus.BAD_REQUEST);
  }

  async update(dto: UpdateDepartmentDto, files: any, id: string) {
    const {
      attachedFiles,
      contentImages1,
      contentImages2,
      deletedFiles,
      ...res
    } = dto;
    const newAttachedFiles = [];
    const newContentImages1 = [];
    const newContentImages2 = [];
    const department = await this.departmentRepository.findByPk(id);
    if (deletedFiles?.length) {
      for (const file of deletedFiles) {
        await this.fileService.deleteFile(file);
      }
    }

    if (!department) {
      throw new Error(`employee with id ${id} not found`);
    }

    if (attachedFiles?.length) {
      newAttachedFiles.push(attachedFiles);
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
        if (file.fieldname === 'attachedFiles[]') {
          newAttachedFiles.push(fileName);
        }
      }),
    );

    await this.departmentRepository.update(
      {
        ...res,
        contentImages2: newContentImages2.length
          ? newContentImages2.join(',')
          : '',
        contentImages1: newContentImages1.length
          ? newContentImages1.join(',')
          : '',
        attachedFiles: newAttachedFiles.length
          ? newAttachedFiles.join(',')
          : '',
      },
      { returning: undefined, where: { id } },
    );

    return await this.departmentRepository.findByPk(id);
  }

  async delete({ id, deletedImages }: { id: string; deletedImages: string }) {
    const images = deletedImages.length ? deletedImages.split(',') : null;
    const deletedCount = await this.departmentRepository.destroy({
      where: { id },
    });
    console.log(images, 23);
    if (images) {
      for (const image of images) {
        if (image) {
          await this.fileService.deleteFile(image);
        }
      }
    }

    if (deletedCount === 0) {
      throw new Error(`Department with id ${id} not found`);
    }

    return await this.findAll();
  }
}

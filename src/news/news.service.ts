import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { News } from './news.model';
import { CreateCooperationDto } from '../cooperation/dto/create-cooperation.dto';
import { FilesService } from '../files/files.service';

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
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { News } from './news.model';

@Injectable()
export class NewsService {
  constructor(@InjectModel(News) private newsRepository: typeof News) {}
  async findAll() {
    return await this.newsRepository.findAll({
      order: [['createdAt', 'DESC']],
    });
  }
}

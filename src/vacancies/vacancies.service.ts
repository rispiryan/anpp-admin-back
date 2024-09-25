import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Vacancies } from './vacancies.model';

@Injectable()
export class VacanciesService {
  constructor(
    @InjectModel(Vacancies) private vacanciesRepository: typeof Vacancies,
  ) {}

  async findAll() {
    return await this.vacanciesRepository.findAll();
  }
}

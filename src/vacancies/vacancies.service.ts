import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Vacancies } from './vacancies.model';
import { CreateVacanciesDto } from './dto/create-vacancies.dto';
import { UpdateVacanciesDto } from './dto/update-vacancies.dto';

@Injectable()
export class VacanciesService {
  constructor(
    @InjectModel(Vacancies) private vacanciesRepository: typeof Vacancies,
  ) {}

  async findAll() {
    return await this.vacanciesRepository.findAll({
      order: [['createdAt', 'DESC']],
    });
  }

  async findOne(id: string) {
    return await this.vacanciesRepository.findOne({
      rejectOnEmpty: undefined,
      where: { id },
    });
  }
  async create(dto: CreateVacanciesDto) {
    return await this.vacanciesRepository.create(dto);
  }

  async update(dto: UpdateVacanciesDto, id: string) {
    const vacancy = await this.vacanciesRepository.findByPk(id);
    if (!vacancy) {
      throw new Error(`Vacancy with id ${id} not found`);
    }

    await this.vacanciesRepository.update(
      { ...dto },
      { returning: undefined, where: { id } },
    );

    return await this.vacanciesRepository.findByPk(id);
  }

  async delete({ id }: { id: string }) {
    const deletedCount = await this.vacanciesRepository.destroy({
      where: { id },
    });

    if (deletedCount === 0) {
      throw new Error(`Vacancies with id ${id} not found`);
    }

    return await this.findAll();
  }
}

import { Module } from '@nestjs/common';
import { VacanciesController } from './vacancies.controller';
import { VacanciesService } from './vacancies.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { Vacancies } from './vacancies.model';

@Module({
  controllers: [VacanciesController],
  providers: [VacanciesService],
  imports: [SequelizeModule.forFeature([Vacancies]), AuthModule],
})
export class VacanciesModule {}

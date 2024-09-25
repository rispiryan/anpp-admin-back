import { Controller, Get, UseGuards } from '@nestjs/common';
import { VacanciesService } from './vacancies.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiBearerAuth('access-token')
@ApiTags('Vacancies')
@UseGuards(JwtAuthGuard)
@Controller('vacancies')
export class VacanciesController {
  constructor(private vacanciesService: VacanciesService) {}
  @Get('/')
  async findAll() {
    return this.vacanciesService.findAll();
  }
}

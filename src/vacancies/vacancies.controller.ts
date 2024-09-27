import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { VacanciesService } from './vacancies.service';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateVacanciesDto } from './dto/create-vacancies.dto';
import { UpdateVacanciesDto } from './dto/update-cooperation.dto';
import { ParamDTO } from '../cooperation/dto/update-cooperation.dto';

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

  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the vacancy',
    type: String,
  })
  @Get('/:id')
  async findOne(@Param() param: ParamDTO) {
    return this.vacanciesService.findOne(param.id);
  }

  @Post('/create')
  async create(@Body() dto: CreateVacanciesDto) {
    return this.vacanciesService.create(dto);
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the cooperation',
    type: String,
  })
  @Patch('update/:id')
  async updateCooperation(
    @Body() dto: UpdateVacanciesDto,
    @Param() param: ParamDTO,
  ) {
    return this.vacanciesService.update(dto, param.id);
  }

  @Delete('delete')
  async delete(@Body() dto: { id: string }) {
    return this.vacanciesService.delete(dto);
  }
}

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
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateVacanciesDto } from './dto/create-vacancies.dto';
import { ParamDTO, UpdateVacanciesDto } from './dto/update-vacancies.dto';

@ApiBearerAuth('access-token')
@ApiTags('Vacancies')
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

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async create(@Body() dto: CreateVacanciesDto) {
    return this.vacanciesService.create(dto);
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the vacancies',
    type: String,
  })
  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  async update(@Body() dto: UpdateVacanciesDto, @Param() param: ParamDTO) {
    return this.vacanciesService.update(dto, param.id);
  }

  @ApiBody({
    description: 'Delete vacancies with image',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        image: { type: 'string' },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  async delete(@Body() dto: { id: string }) {
    return this.vacanciesService.delete(dto);
  }
}

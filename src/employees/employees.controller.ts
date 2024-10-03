import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { EmployeesService } from './employees.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateEmployeesDto } from './dto/create-employees.dto';
import { ParamDTO, UpdateEmployeesDto } from './dto/update-employees.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiBearerAuth('access-token')
@ApiTags('Employees')
@Controller('employees')
export class EmployeesController {
  constructor(private employeesService: EmployeesService) {}

  @Get('/')
  async findAll() {
    return this.employeesService.findAll();
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the employees',
    type: String,
  })
  @Get('/:id')
  async findOne(@Param() param: ParamDTO) {
    return this.employeesService.findOne(param.id);
  }

  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create employees with image',
    schema: {
      type: 'object',
      properties: {
        ar_fullName: { type: 'string' },
        en_fullName: { type: 'string' },
        ru_fullName: { type: 'string' },
        ar_rank: { type: 'string' },
        en_rank: { type: 'string' },
        ru_rank: { type: 'string' },
        ar_content: { type: 'string' },
        en_content: { type: 'string' },
        ru_content: { type: 'string' },
        image: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() dto: CreateEmployeesDto, @UploadedFile() image) {
    return this.employeesService.create(dto, image);
  }

  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Update employee with image',
    schema: {
      type: 'object',
      properties: {
        ar_fullName: { type: 'string' },
        en_fullName: { type: 'string' },
        ru_fullName: { type: 'string' },
        ar_rank: { type: 'string' },
        en_rank: { type: 'string' },
        ru_rank: { type: 'string' },
        ar_content: { type: 'string' },
        en_content: { type: 'string' },
        ru_content: { type: 'string' },
        image: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the employee',
    type: String,
  })
  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  async update(
    @Body() dto: UpdateEmployeesDto,
    @Param() param: ParamDTO,
    @UploadedFile() image,
  ) {
    return this.employeesService.update(dto, image, param.id);
  }

  @ApiBody({
    description: 'Delete employee with image',
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
  async delete(@Body() dto: { id: string; image: string }) {
    return this.employeesService.delete(dto);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
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
import { DepartmentService } from './department.service';
import { ParamDTO, UpdateDepartmentDto } from './dto/update-department.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateDepartmentDto } from './dto/create-department.dto';

@ApiBearerAuth('access-token')
@ApiTags('Department')
@Controller('department')
export class DepartmentController {
  constructor(private departmentService: DepartmentService) {}
  @Get()
  async findAll() {
    return this.departmentService.findAll();
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the news',
    type: String,
  })
  @Get('/:id')
  async findOne(@Param() param: ParamDTO) {
    return this.departmentService.findOne(param.id);
  }

  @UseInterceptors(AnyFilesInterceptor())
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create department with images',
    schema: {
      type: 'object',
      properties: {
        ar_title: { type: 'string' },
        en_title: { type: 'string' },
        ru_title: { type: 'string' },
        ar_content1: { type: 'string' },
        en_content1: { type: 'string' },
        ru_content1: { type: 'string' },
        ar_content2: { type: 'string' },
        en_content2: { type: 'string' },
        ru_content2: { type: 'string' },
        ar_content3: { type: 'string' },
        en_content3: { type: 'string' },
        ru_content3: { type: 'string' },
        slug: { type: 'string' },
        contentImages1: {
          type: 'array',
          items: { type: 'string', format: 'binary' }, // First array of multiple files
        },
        contentImages2: {
          type: 'array',
          items: { type: 'string', format: 'binary' }, // First array of multiple files
        },
        attachedFiles: {
          type: 'array',
          items: { type: 'string', format: 'binary' }, // Second array of multiple files
        },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() dto: CreateDepartmentDto, @UploadedFiles() files) {
    return this.departmentService.create(dto, files);
  }

  @UseInterceptors(AnyFilesInterceptor())
  @ApiConsumes('multipart/form-data')
  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  async update(
    @Body() dto: UpdateDepartmentDto,
    @Param() param: ParamDTO,
    @UploadedFiles() files,
  ) {
    return this.departmentService.update(dto, files, param.id);
  }

  @ApiBody({
    description: 'Delete news with image',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        deletedImages: { type: 'string' },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  async delete(@Body() dto: { id: string; deletedImages: string }) {
    return this.departmentService.delete(dto);
  }
}

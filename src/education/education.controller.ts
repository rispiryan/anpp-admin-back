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
import { EducationService } from './education.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ParamDTO, UpdateEducationDto } from './dto/update-education.dto';
import { CreateEducationDto } from './dto/create-education.dto';

@ApiBearerAuth('access-token')
@ApiTags('Education')
@Controller('education')
export class EducationController {
  constructor(private educationService: EducationService) {}

  @UseInterceptors(AnyFilesInterceptor())
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create education with images',
    schema: {
      type: 'object',
      properties: {
        ar_title: { type: 'string' },
        en_title: { type: 'string' },
        ru_title: { type: 'string' },
        ar_description: { type: 'string' },
        en_description: { type: 'string' },
        ru_description: { type: 'string' },
        contentImages1: {
          type: 'array',
          items: { type: 'string', format: 'binary' }, // First array of multiple files
        },
        contentImages2: {
          type: 'array',
          items: { type: 'string', format: 'binary' }, // Second array of multiple files
        },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() dto: CreateEducationDto, @UploadedFiles() files) {
    return this.educationService.create(dto, files);
  }

  @Get()
  async findAll() {
    return this.educationService.findAll();
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the education',
    type: String,
  })
  @Get('/:id')
  async findOne(@Param() param: ParamDTO) {
    return this.educationService.findOne(param.id);
  }

  @ApiBody({
    description: 'Delete education with image',
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
    return this.educationService.delete(dto);
  }

  @UseInterceptors(AnyFilesInterceptor())
  @ApiConsumes('multipart/form-data')
  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  async update(
    @Body() dto: UpdateEducationDto,
    @Param() param: ParamDTO,
    @UploadedFiles() files,
  ) {
    return this.educationService.update(dto, files, param.id);
  }
}

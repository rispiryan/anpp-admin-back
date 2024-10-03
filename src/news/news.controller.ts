import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { NewsService } from './news.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiBearerAuth('access-token')
@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @UseInterceptors(AnyFilesInterceptor()) // Use this to handle multiple file arrays
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create cooperation with images',
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
  async create(@Body() dto: any, @UploadedFiles() files) {
    return this.newsService.create(dto, files);
  }

  @Get()
  async findAll() {
    return this.newsService.findAll();
  }

  @ApiBody({
    description: 'Delete cooperation with image',
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
  async delete(@Body() dto: { id: string; deletedImages: string }) {
    return this.newsService.delete(dto);
  }
}

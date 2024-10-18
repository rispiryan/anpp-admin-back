import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
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
import { NewsService } from './news.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ParamDTO, UpdateNewsDto } from './dto/update-news.dto';
import { CreateNewsDto } from './dto/create-news.dto';

@ApiBearerAuth('access-token')
@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @UseInterceptors(AnyFilesInterceptor())
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create news with images',
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
  async create(@Body() dto: CreateNewsDto, @UploadedFiles() files) {
    return this.newsService.create(dto, files);
  }

  @Get()
  async findAll(@Query('limit') limit?: number) {
    console.log(limit, 'limit');
    return this.newsService.findAll(+limit);
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the news',
    type: String,
  })
  @Get('/:id')
  async findOne(@Param() param: ParamDTO) {
    return this.newsService.findOne(param.id);
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
    return this.newsService.delete(dto);
  }

  @UseInterceptors(AnyFilesInterceptor())
  @ApiConsumes('multipart/form-data')
  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  async update(
    @Body() dto: UpdateNewsDto,
    @Param() param: ParamDTO,
    @UploadedFiles() files,
  ) {
    return this.newsService.update(dto, files, param.id);
  }
}

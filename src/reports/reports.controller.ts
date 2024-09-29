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
import { ReportsService } from './reports.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateReportsDto } from './dto/create-reports.dto';
import { ParamDTO, UpdateReportsDto } from './dto/update-reports.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@ApiTags('Reports')
@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create reports with file',
    schema: {
      type: 'object',
      properties: {
        fileName: { type: 'string' },
        image: { type: 'string', format: 'binary' },
      },
    },
  })
  @Post('create')
  async create(@Body() dto: CreateReportsDto, @UploadedFile() image) {
    return this.reportsService.create(dto, image);
  }

  @Get()
  async findAll() {
    return this.reportsService.findAll();
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the report',
    type: String,
  })
  @Get('/:id')
  async findOne(@Param() param: ParamDTO) {
    return this.reportsService.findOne(param.id);
  }

  @Delete('delete')
  async delete(@Body() dto: { id: string; image: string }) {
    return this.reportsService.delete(dto);
  }

  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create reports with image',
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        fileName: { type: 'string' },
        image: { type: 'string', format: 'binary', nullable: true },
      },
    },
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the reports',
    type: String,
  })
  @Patch('update/:id')
  async update(
    @Body() dto: UpdateReportsDto,
    @Param() param: ParamDTO,
    @UploadedFile() image,
  ) {
    return this.reportsService.update(dto, image, param.id);
  }
}

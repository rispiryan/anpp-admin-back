import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateCooperationDto } from './dto/create-cooperation.dto';
import { CooperationService } from './cooperation.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
@ApiTags('Cooperation')
@Controller('cooperation')
export class CooperationController {
  constructor(private cooperationService: CooperationService) {}
  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create cooperation with image',
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        link: { type: 'string' },
        image: { type: 'string', format: 'binary' },
      },
    },
  })
  async createCooperation(
    @Body() dto: CreateCooperationDto,
    @UploadedFile() image,
  ) {
    return this.cooperationService.create(dto, image);
  }
}

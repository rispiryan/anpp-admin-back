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

@Controller('cooperation')
export class CooperationController {
  constructor(private cooperationService: CooperationService) {}
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createCooperation(
    @Body() dto: CreateCooperationDto,
    @UploadedFile() image,
  ) {
    return this.cooperationService.create(dto, image);
  }
}

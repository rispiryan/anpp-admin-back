import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateCooperationDto } from './dto/create-cooperation.dto';
import { CooperationService } from './cooperation.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { RoleType } from '../constants/userRoles';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
@ApiBearerAuth('access-token')
@ApiTags('Cooperation')
@Controller('cooperation')
export class CooperationController {
  constructor(private cooperationService: CooperationService) {}
  @Roles(RoleType.ADMIN)
  @UseGuards(RolesGuard)
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
  @Post('create')
  async createCooperation(
    @Body() dto: CreateCooperationDto,
    @UploadedFile() image,
  ) {
    return this.cooperationService.create(dto, image);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.cooperationService.findAll();
  }
}

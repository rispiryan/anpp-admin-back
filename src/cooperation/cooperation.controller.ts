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
import { CreateCooperationDto } from './dto/create-cooperation.dto';
import { CooperationService } from './cooperation.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ParamDTO, UpdateCooperationDto } from './dto/update-cooperation.dto';
@ApiBearerAuth('access-token')
@ApiTags('Cooperation')
@Controller('cooperation')
export class CooperationController {
  constructor(private cooperationService: CooperationService) {}
  // @Roles(RoleType.USER)
  // @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create cooperation with image',
    schema: {
      type: 'object',
      properties: {
        ar_title: { type: 'string' },
        en_title: { type: 'string' },
        ru_title: { type: 'string' },
        link: { type: 'string' },
        image: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createCooperation(
    @Body() dto: CreateCooperationDto,
    @UploadedFile() image,
  ) {
    return this.cooperationService.create(dto, image);
  }

  @Get()
  async findAll() {
    return this.cooperationService.findAll();
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the cooperation',
    type: String,
  })
  @Get('/:id')
  async findOne(@Param() param: ParamDTO) {
    return this.cooperationService.findOne(param.id);
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
  async delete(@Body() dto: { id: string; image: string }) {
    return this.cooperationService.delete(dto);
  }

  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create cooperation with image',
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        link: { type: 'string' },
        image: { type: 'string', format: 'binary', nullable: true },
      },
    },
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the cooperation',
    type: String,
  })
  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  async updateCooperation(
    @Body() dto: UpdateCooperationDto,
    @Param() param: ParamDTO,
    @UploadedFile() image,
  ) {
    return this.cooperationService.update(dto, image, param.id);
  }
}

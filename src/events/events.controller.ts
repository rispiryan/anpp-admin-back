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
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { EventsService } from './events.service';
import { ParamDTO, UpdateEventsDto } from './dto/update-events.dto';
import { CreateEventsDto } from './dto/create-events.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiBearerAuth('access-token')
@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}
  @Get('/')
  async findAll() {
    return this.eventsService.findAll();
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the events',
    type: String,
  })
  @Get('/:id')
  async findOne(@Param() param: ParamDTO) {
    return this.eventsService.findOne(param.id);
  }

  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create events with image',
    schema: {
      type: 'object',
      properties: {
        ar_title: { type: 'string' },
        en_title: { type: 'string' },
        ru_title: { type: 'string' },
        ar_description: { type: 'string' },
        en_description: { type: 'string' },
        ru_description: { type: 'string' },
        link: { type: 'string' },
        image: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async create(@Body() dto: CreateEventsDto, @UploadedFile() image) {
    return this.eventsService.create(dto, image);
  }

  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Update employee with image',
    schema: {
      type: 'object',
      properties: {
        ar_title: { type: 'string' },
        en_title: { type: 'string' },
        ru_title: { type: 'string' },
        ar_description: { type: 'string' },
        en_description: { type: 'string' },
        ru_description: { type: 'string' },
        link: { type: 'string' },
        image: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the events',
    type: String,
  })
  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  async update(
    @Body() dto: UpdateEventsDto,
    @Param() param: ParamDTO,
    @UploadedFile() image,
  ) {
    return this.eventsService.update(dto, image, param.id);
  }

  @ApiBody({
    description: 'Delete events with image',
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
    return this.eventsService.delete(dto);
  }
}

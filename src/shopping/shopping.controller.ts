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
import { ShoppingService } from './shopping.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ParamDTO, UpdateShoppingDto } from './dto/update-shopping.dto';
import { CreateShoppingDto } from './dto/create-shopping.dto';

@ApiBearerAuth('access-token')
@ApiTags('Shopping')
@Controller('shopping')
export class ShoppingController {
  constructor(private shoppingService: ShoppingService) {}
  @Get('/')
  async findAll() {
    return this.shoppingService.findAll();
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the shopping',
    type: String,
  })
  @Get('/:id')
  async findOne(@Param() param: ParamDTO) {
    return this.shoppingService.findOne(param.id);
  }

  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create shopping with image',
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
  async create(@Body() dto: CreateShoppingDto, @UploadedFile() image) {
    return this.shoppingService.create(dto, image);
  }

  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Update shopping with image',
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
    description: 'The ID of the shopping',
    type: String,
  })
  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  async update(
    @Body() dto: UpdateShoppingDto,
    @Param() param: ParamDTO,
    @UploadedFile() image,
  ) {
    return this.shoppingService.update(dto, image, param.id);
  }

  @ApiBody({
    description: 'Delete shopping with image',
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
    return this.shoppingService.delete(dto);
  }
}

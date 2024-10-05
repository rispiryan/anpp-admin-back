import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from '../files/files.service';
import { Shopping } from './shopping.model';
import { CreateShoppingDto } from './dto/create-shopping.dto';
import { UpdateShoppingDto } from './dto/update-shopping.dto';

@Injectable()
export class ShoppingService {
  constructor(
    @InjectModel(Shopping) private shoppingRepository: typeof Shopping,
    private fileService: FilesService,
  ) {}

  async findAll() {
    return await this.shoppingRepository.findAll({
      order: [['createdAt', 'DESC']],
    });
  }

  async findOne(id: string) {
    return await this.shoppingRepository.findOne({
      rejectOnEmpty: undefined,
      where: { id },
    });
  }
  async create(dto: CreateShoppingDto, image: any) {
    const fileName = await this.fileService.createFile(image);
    const shopping = await this.shoppingRepository.create({
      ...dto,
      image: fileName,
    });

    return shopping;
  }

  async update(dto: UpdateShoppingDto, image: any, id: string) {
    const shopping = await this.shoppingRepository.findByPk(id);
    if (!shopping) {
      throw new Error(`shopping with id ${id} not found`);
    }

    let fileName = shopping.image;
    if (image) {
      await this.fileService.deleteFile(shopping.image);
      fileName = await this.fileService.createFile(image);
    }

    await this.shoppingRepository.update(
      { ...dto, image: fileName },
      { returning: undefined, where: { id } },
    );

    return await this.shoppingRepository.findByPk(id);
  }

  async delete({ id, image }: { id: string; image: string }) {
    const deletedCount = await this.shoppingRepository.destroy({
      where: { id },
    });

    await this.fileService.deleteFile(image);
    if (deletedCount === 0) {
      throw new Error(`shopping with id ${id} not found`);
    }

    return await this.findAll();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cooperation } from './cooperation.model';
import { CreateCooperationDto } from './dto/create-cooperation.dto';
import { FilesService } from '../files/files.service';
import { UpdateCooperationDto } from './dto/update-cooperation.dto';

@Injectable()
export class CooperationService {
  constructor(
    @InjectModel(Cooperation) private cooperationRepository: typeof Cooperation,
    private fileService: FilesService,
  ) {}

  async create(dto: CreateCooperationDto, image: any) {
    const fileName = await this.fileService.createFile(image);
    const coop = await this.cooperationRepository.create({
      ...dto,
      image: fileName,
    });

    return coop;
  }

  async update(dto: UpdateCooperationDto, image: any, id: string) {
    const cooperation = await this.cooperationRepository.findByPk(id);
    if (!cooperation) {
      throw new Error(`Cooperation with id ${id} not found`);
    }

    let fileName = cooperation.image;
    if (image) {
      await this.fileService.deleteFile(cooperation.image);
      fileName = await this.fileService.createFile(image);
    }

    await this.cooperationRepository.update(
      { ...dto, image: fileName },
      { returning: undefined, where: { id } },
    );

    return await this.cooperationRepository.findByPk(id);
  }

  async findAll() {
    return await this.cooperationRepository.findAll({
      order: [['createdAt', 'DESC']],
    });
  }
  async findOne(id: string) {
    return await this.cooperationRepository.findOne({
      rejectOnEmpty: undefined,
      where: { id },
    });
  }

  async delete({ id, image }: { id: string; image: string }) {
    const deletedCount = await this.cooperationRepository.destroy({
      where: { id },
    });

    await this.fileService.deleteFile(image);
    if (deletedCount === 0) {
      throw new Error(`Cooperation with id ${id} not found`);
    }

    return await this.findAll();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cooperation } from './cooperation.model';
import { CreateCooperationDto } from './dto/create-cooperation.dto';
import { FilesService } from '../files/files.service';

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

  async findAll() {
    return await this.cooperationRepository.findAll();
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

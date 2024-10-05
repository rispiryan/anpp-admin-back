import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Events } from './events.model';
import { CreateEventsDto } from './dto/create-events.dto';
import { UpdateEventsDto } from './dto/update-events.dto';
import { FilesService } from '../files/files.service';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Events) private eventsRepository: typeof Events,
    private fileService: FilesService,
  ) {}

  async findAll() {
    return await this.eventsRepository.findAll({
      order: [['createdAt', 'DESC']],
    });
  }

  async findOne(id: string) {
    return await this.eventsRepository.findOne({
      rejectOnEmpty: undefined,
      where: { id },
    });
  }
  async create(dto: CreateEventsDto, image: any) {
    const fileName = await this.fileService.createFile(image);
    const events = await this.eventsRepository.create({
      ...dto,
      image: fileName,
    });

    return events;
  }

  async update(dto: UpdateEventsDto, image: any, id: string) {
    const event = await this.eventsRepository.findByPk(id);
    if (!event) {
      throw new Error(`events with id ${id} not found`);
    }

    let fileName = event.image;
    if (image) {
      await this.fileService.deleteFile(event.image);
      fileName = await this.fileService.createFile(image);
    }

    await this.eventsRepository.update(
      { ...dto, image: fileName },
      { returning: undefined, where: { id } },
    );

    return await this.eventsRepository.findByPk(id);
  }

  async delete({ id, image }: { id: string; image: string }) {
    const deletedCount = await this.eventsRepository.destroy({
      where: { id },
    });
    console.log(image, 3443);
    await this.fileService.deleteFile(image);
    if (deletedCount === 0) {
      throw new Error(`Events with id ${id} not found`);
    }

    return await this.findAll();
  }
}

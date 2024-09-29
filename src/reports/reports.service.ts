import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Reports } from './reports.model';
import { FilesService } from '../files/files.service';
import { CreateReportsDto } from './dto/create-reports.dto';
import { UpdateCooperationDto } from '../cooperation/dto/update-cooperation.dto';
import { UpdateReportsDto } from './dto/update-reports.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Reports) private reportsRepository: typeof Reports,
    private fileService: FilesService,
  ) {}

  async findAll() {
    return await this.reportsRepository.findAll({
      order: [['createdAt', 'DESC']],
    });
  }

  async create(dto: CreateReportsDto, file: any) {
    const fileName = await this.fileService.createFile(file);
    const report = await this.reportsRepository.create({
      ...dto,
      file: fileName,
    });

    return report;
  }

  async delete({ id, image }: { id: string; image: string }) {
    const deletedCount = await this.reportsRepository.destroy({
      where: { id },
    });

    await this.fileService.deleteFile(image);
    if (deletedCount === 0) {
      throw new Error(`Cooperation with id ${id} not found`);
    }

    return await this.findAll();
  }

  async findOne(id: string) {
    return await this.reportsRepository.findOne({
      rejectOnEmpty: undefined,
      where: { id },
    });
  }

  async update(dto: UpdateReportsDto, file: any, id: string) {
    const report = await this.reportsRepository.findByPk(id);
    if (!report) {
      throw new Error(`report with id ${id} not found`);
    }

    let fileName = report.file;
    if (file) {
      await this.fileService.deleteFile(report.file);
      fileName = await this.fileService.createFile(file);
    }

    await this.reportsRepository.update(
      { ...dto, file: fileName },
      { returning: undefined, where: { id } },
    );

    return await this.reportsRepository.findByPk(id);
  }
}

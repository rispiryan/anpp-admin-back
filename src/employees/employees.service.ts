import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Employees } from './employees.model';
import { CreateEmployeesDto } from './dto/create-employees.dto';
import { FilesService } from '../files/files.service';
import { UpdateEmployeesDto } from './dto/update-employees.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employees) private employeesRepository: typeof Employees,
    private fileService: FilesService,
  ) {}
  async findAll() {
    return await this.employeesRepository.findAll({
      order: [['createdAt', 'DESC']],
    });
  }

  async findOne(id: string) {
    return await this.employeesRepository.findOne({
      rejectOnEmpty: undefined,
      where: { id },
    });
  }

  async create(dto: CreateEmployeesDto, image: any) {
    const fileName = await this.fileService.createFile(image);
    const employee = await this.employeesRepository.create({
      ...dto,
      image: fileName,
    });

    return employee;
  }

  async update(dto: UpdateEmployeesDto, image: any, id: string) {
    const employee = await this.employeesRepository.findByPk(id);
    if (!employee) {
      throw new Error(`employee with id ${id} not found`);
    }

    let fileName = employee.image;
    if (image) {
      await this.fileService.deleteFile(employee.image);
      fileName = await this.fileService.createFile(image);
    }

    await this.employeesRepository.update(
      { ...dto, image: fileName },
      { returning: undefined, where: { id } },
    );

    return await this.employeesRepository.findByPk(id);
  }

  async delete({ id, image }: { id: string; image: string }) {
    const deletedCount = await this.employeesRepository.destroy({
      where: { id },
    });

    await this.fileService.deleteFile(image);
    if (deletedCount === 0) {
      throw new Error(`employee with id ${id} not found`);
    }

    return await this.findAll();
  }
}

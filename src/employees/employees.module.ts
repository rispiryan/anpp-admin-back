import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from '../files/files.module';
import { AuthModule } from '../auth/auth.module';
import { Employees } from './employees.model';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService],
  imports: [SequelizeModule.forFeature([Employees]), FilesModule, AuthModule],
})
export class EmployeesModule {}

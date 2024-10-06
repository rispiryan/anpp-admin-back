import { Module } from '@nestjs/common';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from '../files/files.module';
import { AuthModule } from '../auth/auth.module';
import { Department } from './department.model';

@Module({
  controllers: [DepartmentController],
  providers: [DepartmentService],
  imports: [SequelizeModule.forFeature([Department]), FilesModule, AuthModule],
})
export class DepartmentModule {}

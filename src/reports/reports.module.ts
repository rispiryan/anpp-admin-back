import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from '../files/files.module';
import { AuthModule } from '../auth/auth.module';
import { Reports } from './reports.model';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService],
  imports: [SequelizeModule.forFeature([Reports]), FilesModule, AuthModule],
})
export class ReportsModule {}

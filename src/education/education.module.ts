import { Module } from '@nestjs/common';
import { EducationController } from './education.controller';
import { EducationService } from './education.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from '../files/files.module';
import { AuthModule } from '../auth/auth.module';
import { Education } from './education.model';

@Module({
  controllers: [EducationController],
  providers: [EducationService],
  imports: [SequelizeModule.forFeature([Education]), FilesModule, AuthModule],
})
export class EducationModule {}

import { Module } from '@nestjs/common';
import { CooperationService } from './cooperation.service';
import { CooperationController } from './cooperation.controller';
import { FilesModule } from '../files/files.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cooperation } from './cooperation.model';

@Module({
  controllers: [CooperationController],
  providers: [CooperationService],
  imports: [SequelizeModule.forFeature([Cooperation]), FilesModule],
})
export class CooperationModule {}

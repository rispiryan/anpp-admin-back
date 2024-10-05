import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { FilesModule } from '../files/files.module';
import { Events } from './events.model';

@Module({
  controllers: [EventsController],
  providers: [EventsService],
  imports: [SequelizeModule.forFeature([Events]), FilesModule, AuthModule],
})
export class EventsModule {}

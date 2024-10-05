import { Module } from '@nestjs/common';
import { ShoppingController } from './shopping.controller';
import { ShoppingService } from './shopping.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from '../files/files.module';
import { AuthModule } from '../auth/auth.module';
import { Shopping } from './shopping.model';

@Module({
  controllers: [ShoppingController],
  providers: [ShoppingService],
  imports: [SequelizeModule.forFeature([Shopping]), FilesModule, AuthModule],
})
export class ShoppingModule {}

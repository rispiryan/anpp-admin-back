import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
import { User } from './users/users.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';
import { CooperationModule } from './cooperation/cooperation.module';
import { Cooperation } from './cooperation/cooperation.model';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV !== 'development'
          ? '.env'
          : `.${process.env.NODE_ENV}.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    SequelizeModule.forRoot({
      // TODO remember to delete it after correct deployment
      ...(process.env.NODE_ENV !== 'development' && {
        uri: 'postgresql://postgres:GyZoGEdHQsXeAJlEUQDrpGslXdICllTH@junction.proxy.rlwy.net:44010/railway',
      }),
      dialect: 'postgres',
      host:
        process.env.NODE_ENV !== 'development'
          ? process.env.POSTGRES_HOST
          : 'postgres.railway.internal',
      port: Number(
        process.env.NODE_ENV !== 'development'
          ? process.env.POSTGRES_PORT
          : 5432,
      ),
      username:
        process.env.NODE_ENV !== 'development'
          ? process.env.POSTGRES_USER
          : 'postgres',
      password:
        process.env.NODE_ENV !== 'development'
          ? process.env.POSTGRES_PASSWORD
          : 'GyZoGEdHQsXeAJlEUQDrpGslXdICllTH',
      database:
        process.env.NODE_ENV !== 'development'
          ? process.env.POSTGRES_DB
          : 'railway',
      models: [User, Role, UserRoles, Cooperation],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    CooperationModule,
    FilesModule,
  ],
})
export class AppModule {}
console.log('Connecting to DB with the following details:');
console.log('Host:', process.env.POSTGRES_HOST);
console.log('Port:', process.env.POSTGRES_PORT);
console.log('User:', process.env.POSTGRES_USER);
console.log('Database:', process.env.POSTGRES_DB);

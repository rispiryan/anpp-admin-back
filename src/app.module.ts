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
import { VacanciesModule } from './vacancies/vacancies.module';
import * as path from 'path';
import { Vacancies } from './vacancies/vacancies.model';
import { EmployeesModule } from './employees/employees.module';
import { Employees } from './employees/employees.model';
import { ReportsModule } from './reports/reports.module';
import { Reports } from './reports/reports.model';
import { NewsModule } from './news/news.module';
import { EventsModule } from './events/events.module';
import { Events } from './events/events.model';
import { ShoppingModule } from './shopping/shopping.module';
import { Shopping } from './shopping/shopping.model';
@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
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
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        User,
        Role,
        UserRoles,
        Cooperation,
        Vacancies,
        Employees,
        Reports,
        Events,
        Shopping,
      ],
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    CooperationModule,
    FilesModule,
    VacanciesModule,
    EmployeesModule,
    ReportsModule,
    NewsModule,
    EventsModule,
    ShoppingModule,
  ],
})
export class AppModule {}

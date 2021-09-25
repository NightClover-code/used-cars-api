import { Module } from '@nestjs/common';
import { AppController } from './app/controller/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app/services/app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/entities/users.entity';
import { Report } from './reports/reports.entity';

@Module({
  imports: [
    UsersModule,
    ReportsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Report],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

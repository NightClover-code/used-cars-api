import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AppController } from './controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './services';
import { UsersModule } from '../users/users.module';
import { ReportsModule } from '../reports/reports.module';
import { User } from '../users/entities';
import { Report } from '../reports/entities';

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
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true }),
    },
  ],
})
export class AppModule {}

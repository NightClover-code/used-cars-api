import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UsersController } from './controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';
import { UsersService, AuthService } from './services';
import { CurrentUserInterceptor } from './interceptors/current-user-interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    {
      useClass: CurrentUserInterceptor,
      provide: APP_INTERCEPTOR,
    },
  ],
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { UsersController } from './controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';
import { UsersService, AuthService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
})
export class UsersModule {}

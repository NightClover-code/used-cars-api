import { Module } from '@nestjs/common';
import { ReportsController } from './controller';
import { Report } from './entities';
import { ReportsService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Report])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}

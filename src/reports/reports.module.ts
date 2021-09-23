import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { Report } from './reports.entity';
import { ReportsService } from './reports.service';

@Module({
  imports: [Report],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}

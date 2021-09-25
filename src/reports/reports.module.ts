import { Module } from '@nestjs/common';
import { ReportsController } from './controller';
import { Report } from './entities';
import { ReportsService } from './services';

@Module({
  imports: [Report],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}

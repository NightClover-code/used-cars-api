import { Body, Controller, UseGuards } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { AuthGuard } from 'src/guards';
import { CreateReportDto } from '../dtos';
import { ReportsService } from '../services';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  createReport(@Body() body: CreateReportDto) {}
}

import { Body, Controller, UseGuards } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { CurrentUser } from 'src/decorators';
import { AuthGuard } from 'src/guards';
import { Serialize } from 'src/interceptors';
import { User } from 'src/users/entities';
import { CreateReportDto } from '../dtos';
import { ReportDto } from '../dtos/report.dto';
import { ReportsService } from '../services';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }
}

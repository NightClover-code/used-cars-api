import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { CurrentUser } from 'src/decorators';
import { AdminGuard, AuthGuard } from 'src/guards';
import { Serialize } from 'src/interceptors';
import { User } from 'src/users/entities';
import { CreateReportDto, ReportDto, ApproveReportDto } from '../dtos';
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

  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
    return this.reportsService.changeApproval(id, body.approved);
  }
}

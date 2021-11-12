import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  UseGuards,
  Query,
  Post,
} from '@nestjs/common';
import { CurrentUser } from 'src/decorators';
import { AdminGuard, AuthGuard } from 'src/guards';
import { Serialize } from 'src/interceptors';
import { User } from 'src/users/entities';
import { CreateReportDto, ReportDto, ApproveReportDto } from '../dtos';
import { GetEstimatedDto } from '../dtos/get-estimate.dto';
import { ReportsService } from '../services';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get()
  getEstimate(@Query() query: GetEstimatedDto) {
    return this.reportsService.createEstimate(query);
  }

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

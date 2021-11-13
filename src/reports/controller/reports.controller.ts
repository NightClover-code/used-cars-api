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
import { Serialize } from '../../interceptors';
import { User } from '../../users/entities';
import { CurrentUser } from '../../decorators';
import { AdminGuard, AuthGuard } from '../../guards';
import {
  CreateReportDto,
  ReportDto,
  ApproveReportDto,
  GetEstimatedDto,
} from '../dtos';
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

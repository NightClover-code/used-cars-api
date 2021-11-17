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
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get()
  @ApiOkResponse({ description: 'Got estimate for existing vehicle' })
  getEstimate(@Query() query: GetEstimatedDto) {
    return this.reportsService.createEstimate(query);
  }

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  @ApiCreatedResponse({ description: 'Sucessfully created report' })
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  @ApiNotFoundResponse({ description: 'Report not found' })
  @ApiOkResponse({ description: 'Report approved by admin' })
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
    return this.reportsService.changeApproval(id, body.approved);
  }
}

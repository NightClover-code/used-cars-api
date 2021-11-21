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
import { CreatedResponse, NotFoundReponse, OkResponse } from 'src/utils';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get()
  @ApiOkResponse({ description: OkResponse.GET_ESTIMATE })
  getEstimate(@Query() query: GetEstimatedDto) {
    return this.reportsService.createEstimate(query);
  }

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  @ApiCreatedResponse({ description: CreatedResponse.CREATE_REPORT })
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  @ApiNotFoundResponse({ description: NotFoundReponse.APPROVE_REPORT })
  @ApiOkResponse({ description: OkResponse.APPROVE_REPORT })
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
    return this.reportsService.changeApproval(id, body.approved);
  }
}

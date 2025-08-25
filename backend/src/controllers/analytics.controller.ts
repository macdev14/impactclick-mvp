import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AnalyticsService } from '../services/analytics.service';
import { AnalyticsResponse } from '../models/analytics.model';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('Analytics')
@Controller('api/analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get campaign analytics' })
  @ApiQuery({ name: 'startDate', required: false, description: 'Start date (YYYY-MM-DD)' })
  @ApiQuery({ name: 'endDate', required: false, description: 'End date (YYYY-MM-DD)' })
  @ApiQuery({ name: 'campaignId', required: false, description: 'Filter by campaign ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Analytics data retrieved successfully',
    type: AnalyticsResponse 
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getAnalytics(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('campaignId') campaignId?: string,
  ): Promise<AnalyticsResponse> {
    return this.analyticsService.getAnalytics({
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      campaignId,
    });
  }

  @Get('time-series')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get time series analytics data' })
  @ApiQuery({ name: 'days', required: false, description: 'Number of days (default: 30)' })
  @ApiResponse({ status: 200, description: 'Time series data retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getTimeSeriesData(@Query('days') days: string = '30') {
    return this.analyticsService.getTimeSeriesData(parseInt(days, 10));
  }
}

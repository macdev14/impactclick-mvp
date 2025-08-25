import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ClickService } from '../services/click.service';
import { ClickDto, ClickResponse } from '../models/click.model';
import { RateLimitGuard } from '../guards/rate-limit.guard';
import { Request } from 'express';

@ApiTags('Click Tracking')
@Controller('api/click')
export class ClickController {
  constructor(private readonly clickService: ClickService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseGuards(RateLimitGuard)
  @ApiOperation({ summary: 'Register a user click interaction' })
  @ApiResponse({ 
    status: 200, 
    description: 'Click registered successfully',
    type: ClickResponse 
  })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  @ApiResponse({ status: 429, description: 'Rate limit exceeded' })
  async registerClick(
    @Body() clickDto: ClickDto,
    @Req() request: Request,
  ): Promise<ClickResponse> {
    // Extract IP address from request
    const ipAddress = request.ip || request.connection.remoteAddress;
    
    return this.clickService.registerClick({
      ...clickDto,
      ipAddress: ipAddress as string,
    });
  }
}

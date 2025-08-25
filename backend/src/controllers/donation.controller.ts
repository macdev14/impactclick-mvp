import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { DonationService } from '../services/donation.service';
import { DonationDto, DonationResponse } from '../models/donation.model';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('Donations')
@Controller('api/donation')
export class DonationController {
  constructor(private readonly donationService: DonationService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Process donation to NGO' })
  @ApiResponse({ 
    status: 200, 
    description: 'Donation processed successfully',
    type: DonationResponse 
  })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async processDonation(@Body() donationDto: DonationDto): Promise<DonationResponse> {
    return this.donationService.processDonation(donationDto);
  }
}

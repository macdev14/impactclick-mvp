import { ApiProperty } from '@nestjs/swagger';

export class CampaignAnalytics {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  clicks: number;

  @ApiProperty()
  donations: number;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  conversionRate: number;
}

export class NgoAnalytics {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  donations: number;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  averageDonation: number;
}

export class AnalyticsResponse {
  @ApiProperty()
  totalClicks: number;

  @ApiProperty()
  totalDonations: number;

  @ApiProperty()
  totalAmount: number;

  @ApiProperty({ type: [CampaignAnalytics] })
  campaigns: CampaignAnalytics[];

  @ApiProperty({ type: [NgoAnalytics] })
  ngos: NgoAnalytics[];

  @ApiProperty()
  timeRange: {
    start: Date;
    end: Date;
  };
}

export interface TimeSeriesData {
  date: string;
  clicks: number;
  donations: number;
  amount: number;
}

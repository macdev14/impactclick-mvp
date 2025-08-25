import { Injectable } from '@nestjs/common';
import { AnalyticsResponse, CampaignAnalytics, NgoAnalytics, TimeSeriesData } from '../models/analytics.model';
import { FirebaseService } from './firebase.service';

@Injectable()
export class AnalyticsService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async getAnalytics(filters: {
    startDate?: Date;
    endDate?: Date;
    campaignId?: string;
  }): Promise<AnalyticsResponse> {
    const { startDate, endDate, campaignId } = filters;

    // Get analytics data from Firestore
    const analyticsData = await this.firebaseService.getAnalytics({
      startDate,
      endDate,
      campaignId,
    });

    // Calculate conversion rates
    const campaigns = analyticsData.campaigns.map(campaign => ({
      ...campaign,
      conversionRate: campaign.clicks > 0 ? (campaign.donations / campaign.clicks) * 100 : 0,
    }));

    const ngos = analyticsData.ngos.map(ngo => ({
      ...ngo,
      averageDonation: ngo.donations > 0 ? ngo.amount / ngo.donations : 0,
    }));

    return {
      totalClicks: analyticsData.totalClicks,
      totalDonations: analyticsData.totalDonations,
      totalAmount: analyticsData.totalAmount,
      campaigns,
      ngos,
      timeRange: {
        start: startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        end: endDate || new Date(),
      },
    };
  }

  async getTimeSeriesData(days: number = 30): Promise<TimeSeriesData[]> {
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - days * 24 * 60 * 60 * 1000);

    const timeSeriesData = await this.firebaseService.getTimeSeriesData(startDate, endDate);

    // Fill in missing dates with zero values
    const filledData: TimeSeriesData[] = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const dateString = currentDate.toISOString().split('T')[0];
      const existingData = timeSeriesData.find(data => data.date === dateString);

      filledData.push({
        date: dateString,
        clicks: existingData?.clicks || 0,
        donations: existingData?.donations || 0,
        amount: existingData?.amount || 0,
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return filledData;
  }

  async getCampaignPerformance(campaignId: string): Promise<CampaignAnalytics> {
    const campaign = await this.firebaseService.getCampaignAnalytics(campaignId);
    
    return {
      ...campaign,
      conversionRate: campaign.clicks > 0 ? (campaign.donations / campaign.clicks) * 100 : 0,
    };
  }

  async getNgoPerformance(ngoId: string): Promise<NgoAnalytics> {
    const ngo = await this.firebaseService.getNgoAnalytics(ngoId);
    
    return {
      ...ngo,
      averageDonation: ngo.donations > 0 ? ngo.amount / ngo.donations : 0,
    };
  }
}

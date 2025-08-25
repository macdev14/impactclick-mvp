import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ClickDto, ClickResponse, ClickRecord } from '../models/click.model';
import { FirebaseService } from './firebase.service';
import { RecaptchaService } from './recaptcha.service';
import { DonationService } from './donation.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ClickService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly recaptchaService: RecaptchaService,
    private readonly donationService: DonationService,
  ) {}

  async registerClick(clickDto: ClickDto): Promise<ClickResponse> {
    try {
      // Validate reCAPTCHA token
      const recaptchaValid = await this.recaptchaService.verifyToken(clickDto.recaptchaToken);
      if (!recaptchaValid) {
        throw new BadRequestException('Invalid reCAPTCHA token');
      }

      // Check for duplicate clicks from same session
      const existingClick = await this.firebaseService.getClickBySession(
        clickDto.sessionId,
        clickDto.campaignId,
      );
      if (existingClick) {
        throw new BadRequestException('Click already registered for this session');
      }

      // Get campaign and NGO data
      const campaign = await this.firebaseService.getCampaign(clickDto.campaignId);
      const ngo = await this.firebaseService.getNgo(clickDto.ngoId);

      if (!campaign || !ngo) {
        throw new BadRequestException('Invalid campaign or NGO');
      }

      // Create click record
      const clickRecord: ClickRecord = {
        id: uuidv4(),
        campaignId: clickDto.campaignId,
        ngoId: clickDto.ngoId,
        sessionId: clickDto.sessionId,
        userAgent: clickDto.userAgent,
        ipAddress: clickDto.ipAddress,
        timestamp: new Date(),
        isValid: true,
      };

      // Store click in Firestore
      await this.firebaseService.saveClick(clickRecord);

      // Generate donation ID
      const donationId = uuidv4();

      // Update click record with donation ID
      clickRecord.donationId = donationId;
      await this.firebaseService.updateClick(clickRecord);

      // Return response with donation details
      return {
        success: true,
        donationId,
        amount: `DKK ${campaign.donationAmount}`,
        ngo: ngo.name,
        message: `Thank you for your donation to ${ngo.name}!`,
        timestamp: new Date(),
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to register click');
    }
  }

  async getClickStats(campaignId?: string): Promise<{ totalClicks: number; validClicks: number }> {
    return this.firebaseService.getClickStats(campaignId);
  }
}

import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { DonationDto, DonationResponse, DonationRecord } from '../models/donation.model';
import { FirebaseService } from './firebase.service';
import { EncryptionService } from './encryption.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DonationService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly encryptionService: EncryptionService,
  ) {}

  async processDonation(donationDto: DonationDto): Promise<DonationResponse> {
    try {
      // Verify donation exists and is valid
      const click = await this.firebaseService.getClickByDonationId(donationDto.donationId);
      if (!click || !click.isValid) {
        throw new BadRequestException('Invalid donation ID');
      }

      // Get NGO information
      const ngo = await this.firebaseService.getNgo(donationDto.ngoId);
      if (!ngo) {
        throw new BadRequestException('Invalid NGO');
      }

      // Check if donation already processed
      const existingDonation = await this.firebaseService.getDonationByDonationId(donationDto.donationId);
      if (existingDonation) {
        throw new BadRequestException('Donation already processed');
      }

      // Process payment (mock implementation)
      const transactionId = await this.processPayment(donationDto);

      // Create donation record
      const donationRecord: DonationRecord = {
        id: uuidv4(),
        donationId: donationDto.donationId,
        ngoId: donationDto.ngoId,
        amount: donationDto.amount,
        currency: donationDto.currency || 'DKK',
        status: 'completed',
        transactionId,
        timestamp: new Date(),
        encryptedData: this.encryptionService.encrypt(JSON.stringify({
          amount: donationDto.amount,
          currency: donationDto.currency,
          ngoId: donationDto.ngoId,
        })),
      };

      // Store donation in Firestore
      await this.firebaseService.saveDonation(donationRecord);

      // Update analytics
      await this.firebaseService.updateAnalytics(donationRecord);

      return {
        success: true,
        transactionId,
        amount: donationDto.amount,
        currency: donationDto.currency || 'DKK',
        ngo: ngo.name,
        message: `Donation of ${donationDto.amount} ${donationDto.currency || 'DKK'} processed successfully`,
        timestamp: new Date(),
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to process donation');
    }
  }

  private async processPayment(donationDto: DonationDto): Promise<string> {
    // Mock payment processing - in production, integrate with real payment gateway
    const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Simulate API call to payment processor
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return transactionId;
  }

  async getDonationStats(): Promise<{ totalDonations: number; totalAmount: number }> {
    return this.firebaseService.getDonationStats();
  }
}

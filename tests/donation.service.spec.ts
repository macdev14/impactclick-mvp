import { DonationService } from '../backend/src/services/donation.service';
import { FirebaseService } from '../backend/src/services/firebase.service';
import { EncryptionService } from '../backend/src/services/encryption.service';

describe('DonationService', () => {
  let donationService: DonationService;
  let mockFirebaseService: jest.Mocked<FirebaseService>;
  let mockEncryptionService: jest.Mocked<EncryptionService>;

  beforeEach(() => {
    mockFirebaseService = {
      getClickByDonationId: jest.fn(),
      getNgo: jest.fn(),
      getDonationByDonationId: jest.fn(),
      saveDonation: jest.fn(),
      updateAnalytics: jest.fn(),
    } as any;

    mockEncryptionService = {
      encrypt: jest.fn(),
    } as any;

    donationService = new DonationService(
      mockFirebaseService,
      mockEncryptionService
    );
  });

  describe('processDonation', () => {
    const mockDonationDto = {
      donationId: 'donation-123',
      ngoId: 'ngo-456',
      amount: 20,
      currency: 'DKK',
    };

    const mockClick = {
      id: 'click-123',
      donationId: 'donation-123',
      isValid: true,
    };

    const mockNgo = {
      id: 'ngo-456',
      name: 'Test NGO',
    };

    it('should process a valid donation successfully', async () => {
      // Arrange
      mockFirebaseService.getClickByDonationId.mockResolvedValue(mockClick);
      mockFirebaseService.getNgo.mockResolvedValue(mockNgo);
      mockFirebaseService.getDonationByDonationId.mockResolvedValue(null);
      mockFirebaseService.saveDonation.mockResolvedValue();
      mockFirebaseService.updateAnalytics.mockResolvedValue();
      mockEncryptionService.encrypt.mockReturnValue('encrypted-data');

      // Act
      const result = await donationService.processDonation(mockDonationDto);

      // Assert
      expect(result.success).toBe(true);
      expect(result.amount).toBe(20);
      expect(result.currency).toBe('DKK');
      expect(result.ngo).toBe('Test NGO');
      expect(mockFirebaseService.saveDonation).toHaveBeenCalled();
      expect(mockFirebaseService.updateAnalytics).toHaveBeenCalled();
    });

    it('should reject invalid donation ID', async () => {
      // Arrange
      mockFirebaseService.getClickByDonationId.mockResolvedValue(null);

      // Act & Assert
      await expect(donationService.processDonation(mockDonationDto))
        .rejects
        .toThrow('Invalid donation ID');
    });

    it('should reject already processed donations', async () => {
      // Arrange
      mockFirebaseService.getClickByDonationId.mockResolvedValue(mockClick);
      mockFirebaseService.getDonationByDonationId.mockResolvedValue({ id: 'existing-donation' });

      // Act & Assert
      await expect(donationService.processDonation(mockDonationDto))
        .rejects
        .toThrow('Donation already processed');
    });

    it('should reject invalid NGO', async () => {
      // Arrange
      mockFirebaseService.getClickByDonationId.mockResolvedValue(mockClick);
      mockFirebaseService.getNgo.mockResolvedValue(null);

      // Act & Assert
      await expect(donationService.processDonation(mockDonationDto))
        .rejects
        .toThrow('Invalid NGO');
    });
  });
});

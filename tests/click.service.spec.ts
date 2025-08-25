import { ClickService } from '../backend/src/services/click.service';
import { FirebaseService } from '../backend/src/services/firebase.service';
import { RecaptchaService } from '../backend/src/services/recaptcha.service';
import { DonationService } from '../backend/src/services/donation.service';

describe('ClickService', () => {
  let clickService: ClickService;
  let mockFirebaseService: jest.Mocked<FirebaseService>;
  let mockRecaptchaService: jest.Mocked<RecaptchaService>;
  let mockDonationService: jest.Mocked<DonationService>;

  beforeEach(() => {
    mockFirebaseService = {
      getClickBySession: jest.fn(),
      saveClick: jest.fn(),
      updateClick: jest.fn(),
      getCampaign: jest.fn(),
      getNgo: jest.fn(),
    } as any;

    mockRecaptchaService = {
      verifyToken: jest.fn(),
    } as any;

    mockDonationService = {} as any;

    clickService = new ClickService(
      mockFirebaseService,
      mockRecaptchaService,
      mockDonationService
    );
  });

  describe('registerClick', () => {
    const mockClickDto = {
      campaignId: 'campaign-123',
      ngoId: 'ngo-456',
      sessionId: 'session-789',
      recaptchaToken: 'recaptcha-token',
      userAgent: 'Mozilla/5.0...',
      ipAddress: '192.168.1.1',
    };

    const mockCampaign = {
      id: 'campaign-123',
      name: 'Test Campaign',
      donationAmount: 20,
    };

    const mockNgo = {
      id: 'ngo-456',
      name: 'Test NGO',
    };

    it('should register a valid click successfully', async () => {
      // Arrange
      mockRecaptchaService.verifyToken.mockResolvedValue(true);
      mockFirebaseService.getClickBySession.mockResolvedValue(null);
      mockFirebaseService.getCampaign.mockResolvedValue(mockCampaign);
      mockFirebaseService.getNgo.mockResolvedValue(mockNgo);
      mockFirebaseService.saveClick.mockResolvedValue();
      mockFirebaseService.updateClick.mockResolvedValue();

      // Act
      const result = await clickService.registerClick(mockClickDto);

      // Assert
      expect(result.success).toBe(true);
      expect(result.amount).toBe('DKK 20');
      expect(result.ngo).toBe('Test NGO');
      expect(mockFirebaseService.saveClick).toHaveBeenCalled();
      expect(mockFirebaseService.updateClick).toHaveBeenCalled();
    });

    it('should reject invalid reCAPTCHA token', async () => {
      // Arrange
      mockRecaptchaService.verifyToken.mockResolvedValue(false);

      // Act & Assert
      await expect(clickService.registerClick(mockClickDto))
        .rejects
        .toThrow('Invalid reCAPTCHA token');
    });

    it('should reject duplicate clicks from same session', async () => {
      // Arrange
      mockRecaptchaService.verifyToken.mockResolvedValue(true);
      mockFirebaseService.getClickBySession.mockResolvedValue({ id: 'existing-click' });

      // Act & Assert
      await expect(clickService.registerClick(mockClickDto))
        .rejects
        .toThrow('Click already registered for this session');
    });

    it('should reject invalid campaign or NGO', async () => {
      // Arrange
      mockRecaptchaService.verifyToken.mockResolvedValue(true);
      mockFirebaseService.getClickBySession.mockResolvedValue(null);
      mockFirebaseService.getCampaign.mockResolvedValue(null);

      // Act & Assert
      await expect(clickService.registerClick(mockClickDto))
        .rejects
        .toThrow('Invalid campaign or NGO');
    });
  });
});

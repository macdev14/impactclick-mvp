export interface ImpactClickConfig {
  campaignId: string;
  ngoId: string;
  apiUrl: string;
  recaptchaSiteKey: string;
  theme?: 'light' | 'dark';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  brandLogo?: string;
  ngoName?: string;
  donationAmount?: number;
  currency?: string;
}

export interface ClickRequest {
  campaignId: string;
  ngoId: string;
  sessionId: string;
  recaptchaToken: string;
  userAgent?: string;
  ipAddress?: string;
}

export interface ClickResponse {
  success: boolean;
  donationId: string;
  amount: string;
  ngo: string;
  message: string;
  timestamp: Date;
}

export interface WidgetState {
  isVisible: boolean;
  isClicked: boolean;
  isLoading: boolean;
  error: string | null;
  donationId: string | null;
}

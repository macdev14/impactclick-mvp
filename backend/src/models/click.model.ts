import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class ClickDto {
  @IsString()
  @IsNotEmpty()
  campaignId: string;

  @IsString()
  @IsNotEmpty()
  ngoId: string;

  @IsString()
  @IsNotEmpty()
  sessionId: string;

  @IsString()
  @IsNotEmpty()
  recaptchaToken: string;

  @IsString()
  @IsOptional()
  userAgent?: string;

  @IsString()
  @IsOptional()
  ipAddress?: string;
}

export class ClickResponse {
  success: boolean;
  donationId: string;
  amount: string;
  ngo: string;
  message: string;
  timestamp: Date;
}

export interface ClickRecord {
  id: string;
  campaignId: string;
  ngoId: string;
  sessionId: string;
  userAgent?: string;
  ipAddress?: string;
  timestamp: Date;
  isValid: boolean;
  donationId?: string;
}

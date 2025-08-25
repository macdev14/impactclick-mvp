import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class DonationDto {
  @IsString()
  @IsNotEmpty()
  donationId: string;

  @IsString()
  @IsNotEmpty()
  ngoId: string;

  @IsNumber()
  amount: number;

  @IsString()
  @IsOptional()
  currency?: string;
}

export class DonationResponse {
  success: boolean;
  transactionId: string;
  amount: number;
  currency: string;
  ngo: string;
  message: string;
  timestamp: Date;
}

export interface DonationRecord {
  id: string;
  donationId: string;
  ngoId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  transactionId?: string;
  timestamp: Date;
  encryptedData: string;
}

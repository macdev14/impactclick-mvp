import { IsString, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNgoDto {
  @ApiProperty({ description: 'NGO name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'NGO description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'NGO website URL' })
  @IsUrl()
  @IsNotEmpty()
  website: string;

  @ApiProperty({ description: 'NGO logo URL', required: false })
  @IsUrl()
  @IsOptional()
  logo?: string;
}

export class UpdateNgoDto {
  @ApiProperty({ description: 'NGO name', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'NGO description', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'NGO website URL', required: false })
  @IsUrl()
  @IsOptional()
  website?: string;

  @ApiProperty({ description: 'NGO logo URL', required: false })
  @IsUrl()
  @IsOptional()
  logo?: string;
}

export class NgoResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  website: string;

  @ApiProperty({ required: false })
  logo?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export interface NgoRecord {
  id: string;
  name: string;
  description: string;
  website: string;
  logo?: string;
  createdAt: Date;
  updatedAt: Date;
}


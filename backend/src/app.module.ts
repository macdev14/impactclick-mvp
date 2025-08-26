import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClickController } from './controllers/click.controller';
import { DonationController } from './controllers/donation.controller';
import { AnalyticsController } from './controllers/analytics.controller';
import { NgoController } from './controllers/ngo.controller';
import { ClickService } from './services/click.service';
import { DonationService } from './services/donation.service';
import { AnalyticsService } from './services/analytics.service';
import { NgoService } from './services/ngo.service';
import { FirebaseService } from './services/firebase.service';
import { RecaptchaService } from './services/recaptcha.service';
import { EncryptionService } from './services/encryption.service';
import { RateLimitGuard } from './guards/rate-limit.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [
    ClickController,
    DonationController,
    AnalyticsController,
    NgoController,
  ],
  providers: [
    ClickService,
    DonationService,
    AnalyticsService,
    NgoService,
    FirebaseService,
    RecaptchaService,
    EncryptionService,
    RateLimitGuard,
    JwtAuthGuard,
  ],
})
export class AppModule {}

import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class RecaptchaService {
  private readonly secretKey = process.env.RECAPTCHA_SECRET_KEY;
  private readonly verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';

  async verifyToken(token: string): Promise<boolean> {
    try {
      if (!this.secretKey) {
        console.warn('reCAPTCHA secret key not configured, skipping verification');
        return true; // Allow in development
      }

      const response = await axios.post(this.verifyUrl, null, {
        params: {
          secret: this.secretKey,
          response: token,
        },
      });

      const { success, score } = response.data;

      // For reCAPTCHA v3, check both success and score
      if (success && score >= 0.5) {
        return true;
      }

      console.log(`reCAPTCHA verification failed: success=${success}, score=${score}`);
      return false;
    } catch (error) {
      console.error('reCAPTCHA verification error:', error);
      return false;
    }
  }

  async verifyTokenWithScore(token: string, minScore: number = 0.5): Promise<{ success: boolean; score: number }> {
    try {
      if (!this.secretKey) {
        console.warn('reCAPTCHA secret key not configured, returning mock response');
        return { success: true, score: 0.9 }; // Mock response for development
      }

      const response = await axios.post(this.verifyUrl, null, {
        params: {
          secret: this.secretKey,
          response: token,
        },
      });

      const { success, score } = response.data;

      return {
        success: success && score >= minScore,
        score: score || 0,
      };
    } catch (error) {
      console.error('reCAPTCHA verification error:', error);
      return { success: false, score: 0 };
    }
  }
}

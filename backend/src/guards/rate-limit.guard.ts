import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RateLimitGuard implements CanActivate {
  private readonly rateLimitMap = new Map<string, { count: number; resetTime: number }>();
  private readonly maxRequests = 10; // Max requests per window
  private readonly windowMs = 60000; // 1 minute window

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const clientIp = request.ip || request.connection.remoteAddress;
    
    return this.checkRateLimit(clientIp);
  }

  private checkRateLimit(clientIp: string): boolean {
    const now = Date.now();
    const clientData = this.rateLimitMap.get(clientIp);

    if (!clientData || now > clientData.resetTime) {
      // First request or window expired
      this.rateLimitMap.set(clientIp, {
        count: 1,
        resetTime: now + this.windowMs,
      });
      return true;
    }

    if (clientData.count >= this.maxRequests) {
      throw new HttpException(
        'Rate limit exceeded. Please try again later.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    // Increment request count
    clientData.count++;
    this.rateLimitMap.set(clientIp, clientData);
    
    return true;
  }
}

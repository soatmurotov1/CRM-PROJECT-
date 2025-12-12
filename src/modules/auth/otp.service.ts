import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';

@Injectable()
export class OtpService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async setOtp(email: string, otp: string, ttlSeconds = 600) {
    await this.redis.set(`otp:teacher:${email}`, otp, 'EX', ttlSeconds);
  }

  async getOtp(email: string) {
    return this.redis.get(`otp:teacher:${email}`)
  }

  async deleteOtp(email: string) {
    return this.redis.del(`otp:teacher:${email}`)
  }
}

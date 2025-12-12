import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class OtpService {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) {}

  async saveOtp(email: string, code: number, ttl = 300) {
    await this.redisClient.set(`otp:${email}`, code, 'EX', ttl)
  }

  async verifyOtp(email: string, code: number) {
    const savedCode = await this.redisClient.get(`otp:${email}`)
    if (!savedCode) return false
    return savedCode === code.toString()
  }

  async deleteOtp(email: string) {
    await this.redisClient.del(`otp:${email}`)
  }
}

import { Injectable } from '@nestjs/common';
import { NesMailerService } from './common/mailer/mailer.service';

@Injectable()
export class AppService {
  constructor(private readonly mailer: NesMailerService) {}

  async createUser(payload: any){
    const code = Math.floor(100000 + Math.random() * 900000)
    await this.mailer.sendEmail(payload.email, "One Time Password", code)

    return {
      success: true,
      message: `${payload.email} ga code yuborildi`
    }
  }
}

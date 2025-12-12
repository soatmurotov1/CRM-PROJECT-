import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class NesMailerService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(email: string, subject: string, code: number) {
    await this.mailerService.sendMail({
      to: email,
      subject,
      template: 'index',
      context: { code },
    });
  }
}

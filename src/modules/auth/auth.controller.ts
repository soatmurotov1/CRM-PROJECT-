import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { VerifyOtpDto } from './dto/verify.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register')
  async register(@Body() dto: any) {
    return this.auth.register(dto)
  }

  @Post('verify')
  async verify(@Body() body: VerifyOtpDto) {
    return this.auth.verifyOtp(body.email, body.code)
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.auth.login(body.email, body.password)
  }
}

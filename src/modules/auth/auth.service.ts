import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { TeacherService } from '../teacher/teacher.service';
import { OtpService } from './otp.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { NesMailerService } from 'src/common/mailer/mailer.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly teacherService: TeacherService,
    private readonly mailer: NesMailerService,
    private readonly otpService: OtpService,
    private readonly jwtService: JwtService
  ) {}

  async register(dto: any) {
  const existing = await this.teacherService.findByEmail(dto.email).catch(() => null)

  if (existing) {
    if (existing.status !== 'INACTIVE') {
      const otp = Math.floor(100000 + Math.random() * 900000)
      await this.otpService.setOtp(existing.email, otp.toString(), 600)
      await this.mailer.sendEmail(existing.email, 'Your OTP code', otp)
      return { message: `Siz avval ro'yxatdan o'tganingiz, yangi OTP yuborildi` }
    }

    throw new BadRequestException('Email already exists and verified')
  }

  const created = await this.teacherService.create(dto)

  const otp = Math.floor(100000 + Math.random() * 900000)
  await this.otpService.setOtp(created.email, otp.toString(), 600)
  await this.mailer.sendEmail(created.email, `Your OTP code`, otp)

  return { message: `Ro'yxatdan o'tildi, emailga OTP yuborildi` }
}


  async verifyOtp(email: string, code: string) {
    const stored = await this.otpService.getOtp(email)

    if (!stored) throw new BadRequestException('OTP expired or not found')

    if (stored !== code) throw new BadRequestException('Invalid OTP')
    await this.teacherService.markVerifiedByEmail(email)
    await this.otpService.deleteOtp(email)

    return { message: 'Verified successfully' }
  }

  async login(email: string, password: string) {
    const teacher = await this.teacherService.findByEmail(email)
    if (!teacher) throw new UnauthorizedException('Invalid credentials')

    const match = await bcrypt.compare(password, teacher.password)
    if (!match) throw new UnauthorizedException('Invalid credentials')

    if (teacher.status !== 'ACTIVE') throw new UnauthorizedException('Not verified')

    const payload = { sub: teacher.id, email: teacher.email, role: 'TEACHER' }
    const token = this.jwtService.sign(payload)

    return { access_token: token }
  }
}

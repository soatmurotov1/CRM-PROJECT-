import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TeacherModule } from '../teacher/teacher.module';
import { StudentModule } from '../student/student.module';
import { StaffModule } from '../staff/staff.module';
import { OtpService } from './otp.service';
import { RedisModule } from '../../common/redis/redis.module';
import { JwtModule } from '@nestjs/jwt';
import { NesMailerService } from 'src/common/mailer/mailer.service';


@Module({
  imports: [
    TeacherModule,
    StudentModule,
    StaffModule,
    RedisModule,
    JwtModule.register({
      secret: 'SECRET',
      signOptions: { expiresIn: '7d' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, OtpService, NesMailerService]
})
export class AuthModule {}

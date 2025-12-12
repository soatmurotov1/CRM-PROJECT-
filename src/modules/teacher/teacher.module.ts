import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { PrismaService } from 'prisma/prisma.service';
import { TeacherController } from './teacher.controller';

@Module({
  controllers: [TeacherController],
  providers: [TeacherService, PrismaService],
  exports: [TeacherService]
})
export class TeacherModule {}

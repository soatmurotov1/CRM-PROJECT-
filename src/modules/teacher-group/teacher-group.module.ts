import { Module } from '@nestjs/common';
import { TeacherGroupService } from './teacher-group.service';
import { TeacherGroupController } from './teacher-group.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [TeacherGroupController],
  providers: [TeacherGroupService, PrismaService],
})
export class TeacherGroupModule {}

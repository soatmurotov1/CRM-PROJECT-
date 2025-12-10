import { Module } from '@nestjs/common';
import { CoursesService } from "./course.service"
import { CoursesController } from "./course.controller"
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService, PrismaService],
})
export class CourseModule {}

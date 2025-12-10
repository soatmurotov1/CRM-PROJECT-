import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BranchModule } from "../src/modules/branch/branch.module"
import { CourseModule } from "../src/modules/course/course.module"
import { TeacherModule } from './modules/teacher/teacher.module';
import { StudentModule } from './modules/student/student.module';
import { StaffModule } from './modules/staff/staff.module';
import { GroupModule } from './modules/group/group.module';
import { RoomModule } from './modules/room/room.module';
import { StudentGroupModule } from './modules/student-group/student-group.module';
import { TeacherGroupModule } from './modules/teacher-group/teacher-group.module';

@Module({
  imports: [
    BranchModule,
    CourseModule, 
    TeacherModule, 
    CourseModule, 
    StudentModule,
    StaffModule,
    GroupModule, 
    RoomModule,
    StudentGroupModule, 
    TeacherGroupModule
  ],
  providers: [PrismaService],
})
export class AppModule {}

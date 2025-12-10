import { Module } from '@nestjs/common';
import { StudentModule } from "./student/student.module"
import { TeacherModule } from "./teacher/teacher.module"
import { BranchModule } from "./branch/branch.module"
import { CourseModule } from "./course/course.module"
import { StaffModule } from './staff/staff.module';
import { GroupModule } from './group/group.module';
import { RoomModule } from './room/room.module';
import { StudentGroupModule } from './student-group/student-group.module';
import { TeacherGroupModule } from './teacher-group/teacher-group.module';

@Module({
  imports: [StudentModule, TeacherModule, BranchModule, CourseModule, StaffModule, StudentGroupModule, TeacherGroupModule, GroupModule, RoomModule, StudentGroupModule]
})
export class ModulesModule {}

import { Controller, Get, Post, Body, Patch, Delete, Param } from "@nestjs/common";
import { TeacherGroupService } from "./teacher-group.service";
import { CreateTeacherGroupDto } from "./dto/create-teacher-group.dto";
import { UpdateTeacherGroupDto } from "./dto/update-teacher-group.dto";

@Controller("teacher-groups")
export class TeacherGroupController {
  constructor(private service: TeacherGroupService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(":teacherId/:groupId")
  findOne(@Param("teacherId") teacherId: string, @Param("groupId") groupId: string) {
    return this.service.findOne(+teacherId, +groupId);
  }

  @Post()
  create(@Body() dto: CreateTeacherGroupDto) {
    return this.service.create(dto);
  }

  @Patch(":teacherId/:groupId")
  update(
    @Param("teacherId") teacherId: string,
    @Param("groupId") groupId: string,
    @Body() dto: UpdateTeacherGroupDto
  ) {
    return this.service.update(+teacherId, +groupId, dto);
  }

  @Delete(":teacherId/:groupId")
  delete(@Param("teacherId") teacherId: string, @Param("groupId") groupId: string) {
    return this.service.remove(+teacherId, +groupId);
  }
}

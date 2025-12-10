import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { TeacherGroupService } from './teacher-group.service';
import { TeacherGroup } from '@prisma/client';
import { CreateTeacherGroupDto } from './dto/create-teacher-group.dto';
import { UpdateTeacherGroupDto } from './dto/update-teacher-group.dto';

@Controller('teacher-groups')
export class TeacherGroupController {
  constructor(private readonly teacherGroupService: TeacherGroupService) {}

  @Post()
  create(@Body() data: CreateTeacherGroupDto): Promise<TeacherGroup> {
    return this.teacherGroupService.create(data)
  }


  @Get()
  getAll(): Promise<TeacherGroup[]> {
    return this.teacherGroupService.getAll()
  }


  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number): Promise<TeacherGroup> {
    return this.teacherGroupService.getOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateTeacherGroupDto,
  ): Promise<TeacherGroup> {
    return this.teacherGroupService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return this.teacherGroupService.delete(id);
  }
}

import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller("students")
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto)
  }

  @Get()
  findAll() {
    return this.studentService.findAll()
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.studentService.findOne(id)
  }

  @Put(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(id, updateStudentDto)
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.studentService.remove(id)
  }
}

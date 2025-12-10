import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async create(createCourseDto: CreateCourseDto) {
    return await this.prisma.course.create({
      data: createCourseDto 
    })
  }

  async findAll() {
    return await this.prisma.course.findMany();
  }

  async findOne(id: number) {
    const course = await this.prisma.course.findUnique({
      where: { id }
    })

    if (!course) throw new NotFoundException("course not found")
    return course
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    await this.findOne(id)

    return await this.prisma.course.update({
      where: { id },
      data: updateCourseDto
    })
  }
  async remove(id: number) {
    await this.findOne(id)
    await this.prisma.course.delete({
      where: { id }
    })

    return { message: "course deleted" }
  }
}

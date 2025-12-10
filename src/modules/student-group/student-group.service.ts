import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentGroupDto } from './dto/create-student-group.dto';
import { UpdateStudentGroupDto } from './dto/update-student-group.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class StudentGroupService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateStudentGroupDto) {
    return this.prisma.studentGroup.create({
      data: dto
    })
  }

  async findAll() {
    return this.prisma.studentGroup.findMany({
      include: {
        student: true,
        group: true,
        branch: true
      }
    })
  }

  async findOne(id: number) {
    const studentGroup = await this.prisma.studentGroup.findUnique({
      where: { id },
      include: {
        student: true,
        group: true,
        branch: true
      }
    })

    if (!studentGroup) {
      throw new NotFoundException(`StudentGroup with id ${id} not found`)
    }
    return studentGroup
  }

  async update(id: number, dto: UpdateStudentGroupDto) {
    await this.findOne(id)
    return this.prisma.studentGroup.update({
      where: { id },
      data: dto
    })
  }

  async remove(id: number) {
    await this.findOne(id)
    await this.prisma.studentGroup.delete({
      where: { id }
    })
    return { message: "StudentGroup deleted successfully"}
  }
}

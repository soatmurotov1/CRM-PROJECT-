import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from "../../../prisma/prisma.service"
import { CreateStudentDto } from "./dto/create-student.dto"
import { UpdateStudentDto } from "./dto/update-student.dto"
import * as bcrypt from 'bcrypt'

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateStudentDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10)

    return this.prisma.student.create({
      data: { ...dto, password: hashedPassword }
    })
  }
  async findAll() {
    return this.prisma.student.findMany({
      include: {
        branch: true,
        studentGroups: true
      }
    })
  }


  async findOne(id: number) {
    const student = await this.prisma.student.findUnique({
      where: { id },
      include: {
        branch: true,
        studentGroups: true,
      }
    })

    if (!student) throw new NotFoundException("student not found")
    return student
  }

  async update(id: number, dto: UpdateStudentDto) {
    const student = await this.prisma.student.findUnique({ where: { id } })

    if (!student) throw new NotFoundException("student not found")

    const updateData: any = { ...dto }

    if (dto.password) {
      updateData.password = await bcrypt.hash(dto.password, 10)
    }

    return this.prisma.student.update({
      where: { id },
      data: updateData
    })
  }

  async remove(id: number) {
    const student = await this.prisma.student.findUnique({ where: { id } })
    if (!student) throw new NotFoundException("student not found")

    await this.prisma.student.delete({ where: { id }})
    return { message: "student deleted successfully"}
  }
}

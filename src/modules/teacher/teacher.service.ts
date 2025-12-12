import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TeacherService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTeacherDto) {
    const hashed = await bcrypt.hash(dto.password, 10);
    return this.prisma.teacher.create({ data: { ...dto, password: hashed } });
  }

  async findAll() {
    return this.prisma.teacher.findMany({ include: { branch: true } });
  }

  async findOne(id: number) {
    const teacher = await this.prisma.teacher.findUnique({
      where: { id },
      include: { branch: true },
    });
    if (!teacher) throw new NotFoundException('Teacher not found');
    return teacher;
  }

  async update(id: number, dto: UpdateTeacherDto) {
    const teacher = await this.prisma.teacher.findUnique({ where: { id } });
    if (!teacher) throw new NotFoundException('Teacher not found');

    const updateData: any = { ...dto };
    if (dto.password) {
      updateData.password = await bcrypt.hash(dto.password, 10);
    }

    return this.prisma.teacher.update({ where: { id }, data: updateData });
  }

  async remove(id: number) {
    const teacher = await this.prisma.teacher.findUnique({ where: { id } });
    if (!teacher) throw new NotFoundException('Teacher not found');
    await this.prisma.teacher.delete({ where: { id } });
    return { message: 'Teacher deleted successfully' };
  }

  async findByEmail(email: string) {
    return this.prisma.teacher.findUnique({ where: { email } });
  }

  async markVerifiedByEmail(email: string) {
    return this.prisma.teacher.update({
      where: { email },
      data: { status: 'ACTIVE' },
    });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { TeacherGroup } from '@prisma/client';
import { CreateTeacherGroupDto } from './dto/create-teacher-group.dto';
import { UpdateTeacherGroupDto } from './dto/update-teacher-group.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TeacherGroupService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateTeacherGroupDto): Promise<TeacherGroup> {
    return this.prisma.teacherGroup.create({
      data
    })
  }

  
  async getOne(id: number): Promise<TeacherGroup> {
    const teacherGroup = await this.prisma.teacherGroup.findUnique({ where: { id } })
    if (!teacherGroup) throw new NotFoundException(`TeacherGroup with ID ${id} not found`)
    return teacherGroup
  }
  
  
  async getAll(): Promise<TeacherGroup[]> {
    return this.prisma.teacherGroup.findMany()
}


  async update(id: number, data: UpdateTeacherGroupDto): Promise<TeacherGroup> {
    const exists = await this.prisma.teacherGroup.findUnique({ where: { id } })
    if (!exists) throw new NotFoundException(`TeacherGroup with ID ${id} not found`)
    return this.prisma.teacherGroup.update({ where: { id }, data })
  }


  
  async delete(id: number): Promise<{ message: string }> {
    const exists = await this.prisma.teacherGroup.findUnique({ where: { id } })
    if (!exists) throw new NotFoundException(`TeacherGroup with ID ${id} not found`)
    await this.prisma.teacherGroup.delete({ where: { id } })
    return { message: `TeacherGroup with ID ${id} deleted` }
  }
}



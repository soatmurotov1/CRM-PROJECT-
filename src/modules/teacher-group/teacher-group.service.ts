import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTeacherGroupDto } from "./dto/create-teacher-group.dto";
import { UpdateTeacherGroupDto } from "./dto/update-teacher-group.dto";
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class TeacherGroupService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.teacherGroup.findMany({
      include: { teacher: true, group: true, branch: true }
    })
  }

  async findOne(teacherId: number, groupId: number) {
    const tg = await this.prisma.teacherGroup.findUnique({
      where: {
        teacherId_groupId: { teacherId, groupId }
      },
      include: { teacher: true, group: true, branch: true }
    })

    if (!tg) {
      throw new NotFoundException(`TeacherGroup teacherId=${teacherId} va groupId=${groupId} topilmadi`)
    }

    return tg
  }

  async create(dto: CreateTeacherGroupDto) {
    const teacher = await this.prisma.teacher.findUnique({ where: { id: dto.teacherId } })
    if (!teacher) throw new NotFoundException(`Teacher id=${dto.teacherId} topilmadi`)

    const group = await this.prisma.group.findUnique({ where: { id: dto.groupId } })
    if (!group) throw new NotFoundException(`Group id=${dto.groupId} topilmadi`)

    const branch = await this.prisma.branch.findUnique({ where: { id: dto.branchId } })
    if (!branch) throw new NotFoundException(`Branch id=${dto.branchId} topilmadi`)
    return this.prisma.teacherGroup.create({
      data: {
        teacherId: dto.teacherId,
        groupId: dto.groupId,
        branchId: dto.branchId,
      }
    })
  }

  async update(teacherId: number, groupId: number, dto: UpdateTeacherGroupDto) {
    const tg = await this.prisma.teacherGroup.findUnique({
      where: { teacherId_groupId: { teacherId, groupId } }
    })
    if (!tg) throw new NotFoundException(`TeacherGroup teacherId=${teacherId} va groupId=${groupId} topilmadi`)

    return this.prisma.teacherGroup.update({
      where: { teacherId_groupId: { teacherId, groupId } },
      data: dto,
    })
  }

  async remove(teacherId: number, groupId: number) {
    const tg = await this.prisma.teacherGroup.findUnique({
      where: { teacherId_groupId: { teacherId, groupId } }
    })

    if (!tg) throw new NotFoundException(`TeacherGroup teacherId=${teacherId} va groupId=${groupId} topilmadi`)

    return this.prisma.teacherGroup.delete({
      where: { teacherId_groupId: { teacherId, groupId } }
    })
  }
}

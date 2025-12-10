import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateGroupDto) {
    return this.prisma.group.create({ data: dto })
  }

  async findAll() {
    return this.prisma.group.findMany({
      include: {
        course: true,
        room: true,
        branch: true,
        teacherGroups: true,
        studentGroups: true
      }
    })
  }

  async findOne(id: number) {
    const group = await this.prisma.group.findUnique({
      where: { id },
      include: {
        course: true,
        room: true,
        branch: true,
        teacherGroups: true,
        studentGroups: true
      }
    });

    if (!group) throw new NotFoundException("Group not found")
    return group
  }

  async update(id: number, dto: UpdateGroupDto) {
    const exists = await this.prisma.group.findUnique({ where: { id } })

    if (!exists) throw new NotFoundException("Group not found")
    return this.prisma.group.update({
      where: { id },
      data: dto
    })
  }

  async remove(id: number) {
    const exists = await this.prisma.group.findUnique({ where: { id } })

    if (!exists) throw new NotFoundException("Group not found")
    await this.prisma.group.delete({ where: { id } })
    return { message: "Group deleted successfully" }
  }
}

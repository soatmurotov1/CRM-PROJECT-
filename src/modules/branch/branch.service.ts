import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from "../../../prisma/prisma.service"
import { CreateBranchDto } from "./dto/create-branch.dto"
import { UpdateBranchDto } from "./dto/update-branch.dto"

@Injectable()
export class BranchService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBranchDto) {
    return await this.prisma.branch.create({
      data: dto
    })
  }

  async findAll() {
    return await this.prisma.branch.findMany()
  }

  async findOne(id: number) {
    const branch = await this.prisma.branch.findUnique({
      where: { id }
    })

    if (!branch) throw new NotFoundException("Branch not found" )
    return branch
  }

  async update(id: number, dto: UpdateBranchDto) {
    await this.findOne(id)

    return await this.prisma.branch.update({
      where: { id },
      data: dto
    })
  }

  async remove(id: number) {
    await this.findOne(id)

    await this.prisma.branch.delete({
      where: { id }
    })

    return { message: "branch deleted" }
  }
}

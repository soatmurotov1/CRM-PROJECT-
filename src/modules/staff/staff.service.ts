import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { CreateStaffDto } from "./dto/create-staff.dto";
import { UpdateStaffDto } from "./dto/update-staff.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class StaffService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateStaffDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    return this.prisma.staff.create({
      data: {
        ...dto,
        password: hashedPassword
      }
    })
  }

  async findAll() {
    return this.prisma.staff.findMany({
      include: { branch: true }
    })
  }

  async findOne(id: number) {
    const staff = await this.prisma.staff.findUnique({
      where: { id },
      include: { branch: true }
    })

    if (!staff) throw new NotFoundException("Staff not found")
    return staff
  }

  async update(id: number, dto: UpdateStaffDto) {
    const staff = await this.prisma.staff.findUnique({ where: { id } })

    if (!staff) throw new NotFoundException("Staff not found")
    const updateData = { ...dto }

    if (dto.password) {
      updateData.password = await bcrypt.hash(dto.password, 10)
    }

    return this.prisma.staff.update({
      where: { id },
      data: updateData
    })
  }

  async remove(id: number) {
    const staff = await this.prisma.staff.findUnique({ where: { id } })

    if (!staff) throw new NotFoundException("Staff not found")

    await this.prisma.staff.delete({ where: { id } })
    return { message: "Staff deleted successfully" }
  }
}

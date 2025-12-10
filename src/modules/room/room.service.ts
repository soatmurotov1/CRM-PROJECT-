import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateRoomDto) {
    return this.prisma.room.create({
      data: dto
    })
  }

  async findAll() {
    return this.prisma.room.findMany({
      include: {
        branch: true,
        groups: true
      }
    })
  }

  async findOne(id: number) {
    const room = await this.prisma.room.findUnique({
      where: { id },
      include: {
        branch: true,
        groups: true
      }
    })

    if (!room) throw new NotFoundException("Room not found");

    return room
  }

  async update(id: number, dto: UpdateRoomDto) {
    const exists = await this.prisma.room.findUnique({ where: { id } });

    if (!exists) throw new NotFoundException("Room not found");

    return this.prisma.room.update({
      where: { id },
      data: dto
    })
  }

  async remove(id: number) {
    const exists = await this.prisma.room.findUnique({ where: { id } })

    if (!exists) throw new NotFoundException("Room not found")
    await this.prisma.room.delete({ where: { id } })
    return { message: "Room deleted successfully" }
  }
}

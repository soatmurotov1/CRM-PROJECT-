import { Controller, Post, Get, Patch, Delete, Param, Body, ParseIntPipe } from "@nestjs/common";
import { GroupService } from "./group.service";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";

@Controller("groups")
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  create(@Body() dto: CreateGroupDto) {
    return this.groupService.create(dto);
  }

  @Get()
  findAll() {
    return this.groupService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.groupService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateGroupDto
  ) {
    return this.groupService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.groupService.remove(id);
  }
}

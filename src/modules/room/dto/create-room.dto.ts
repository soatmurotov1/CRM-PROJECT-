import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Status } from "@prisma/client";

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsNumber()
  @IsNotEmpty()
  capacity: number

  @IsNumber()
  @IsNotEmpty()
  branchId: number

  @IsEnum(Status)
  status?: Status
}

import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Status } from "@prisma/client";

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsNumber()
  @IsNotEmpty()
  courseId: number

  @IsNumber()
  @IsNotEmpty()
  branchId: number

  @IsNumber()
  @IsNotEmpty()
  roomId: number

  @IsDateString()
  startLesson: Date

  @IsDateString()
  startDate: Date

  @IsDateString()
  endDate: Date

  @IsEnum(Status)
  status?: Status
}

import { IsOptional, IsInt, IsEnum } from "class-validator";
import { Status } from "@prisma/client";

export class UpdateTeacherGroupDto {
  @IsOptional()
  @IsInt()
  branchId?: number;

  @IsOptional()
  @IsEnum(Status)
  status?: Status;
}

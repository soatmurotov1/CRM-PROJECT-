import { IsInt, IsEnum, IsOptional, IsNotEmpty, IsString } from 'class-validator';
import { Status } from '@prisma/client';

export class CreateTeacherGroupDto {
  @IsInt()
  @IsNotEmpty()
  teacherId: number

  @IsInt()
  @IsNotEmpty()
  groupId: number

  @IsInt()
  @IsNotEmpty()
  branchId: number

  @IsOptional()
  @IsString()
  @IsEnum(Status)
  status?: Status
}

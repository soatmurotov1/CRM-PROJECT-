import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { StaffRole, Status } from "@prisma/client";

export class CreateStaffDto {
  @IsString()
  @IsNotEmpty()
  fullName: string

  @IsOptional()
  @IsString()
  photo?: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @MinLength(5)
  @MaxLength(12)
  @IsNotEmpty()
  password: string

  @IsString()
  @IsNotEmpty()
  phone: string

  @IsEnum(StaffRole)
  @IsOptional()
  role?: StaffRole

  @IsNumber()
  @IsNotEmpty()
  branchId: number

  @IsOptional()
  @IsEnum(Status)
  status?: Status
}

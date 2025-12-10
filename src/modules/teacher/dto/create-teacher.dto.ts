import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { Status } from "@prisma/client";

export class CreateTeacherDto {
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

  @IsNumber()
  branchId: number

  @IsOptional()
  @IsEnum(Status)
  status?: Status
}

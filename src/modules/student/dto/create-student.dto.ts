import { IsString, IsEmail, IsOptional, IsInt, IsNotEmpty } from "class-validator"

export class CreateStudentDto {
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
  @IsNotEmpty()
  phone: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsInt()
  @IsNotEmpty()
  branchId: number
}

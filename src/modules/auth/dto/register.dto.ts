import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength, MaxLength, IsOptional, IsNumber } from 'class-validator';

export enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  STAFF = 'STAFF'
}

export class RegisterDto {
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
  password: string

  @IsString()
  @IsNotEmpty()
  phone: string

  @IsNumber()
  branchId: number

  @IsEnum(UserRole)
  role: UserRole
}

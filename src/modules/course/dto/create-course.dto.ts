import { IsNotEmpty, IsEnum, IsNumber, IsPositive, IsString, IsOptional } from 'class-validator';
import { CourseLevel, Status } from '@prisma/client';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  price: number

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  durationMonth: number

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  durationHours: number

  @IsEnum(CourseLevel)
  @IsNotEmpty()
  @IsNotEmpty()
  level: CourseLevel

  @IsNumber()
  @IsNotEmpty()
  branchId: number

  @IsOptional()
  @IsString()
  status: Status
}

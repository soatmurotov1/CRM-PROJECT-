import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { Status } from '@prisma/client';

export class CreateBranchDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsOptional()
  @IsString()
  logoUrl?: string

  @IsString()
  @IsNotEmpty()
  address: string

  @IsOptional()
  @IsEnum(Status)
  status?: Status


}

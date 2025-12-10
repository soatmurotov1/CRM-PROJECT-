import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateStudentGroupDto {
  @IsInt()
  @IsNotEmpty()
  studentId: number

  @IsInt()
  @IsNotEmpty()
  groupId: number

  @IsInt()
  @IsNotEmpty()
  branchId: number

  @IsOptional()
  status?: 'ACTIVE' | 'INACTIVE'
}

import { IsInt, IsNotEmpty } from "class-validator";

export class CreateTeacherGroupDto {
  @IsInt()
  @IsNotEmpty()
  teacherId: number

  @IsInt()
  @IsNotEmpty()
  branchId: number

  @IsInt()
  @IsNotEmpty()
  groupId: number
}

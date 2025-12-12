import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"
import { UserRole } from "./register.dto"



export class LoginDto {
    
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string
    
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(12)
    password: string

    @IsEnum(UserRole)
    role: UserRole
    
}



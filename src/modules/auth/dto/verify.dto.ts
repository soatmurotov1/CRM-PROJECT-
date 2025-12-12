import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class VerifyOtpDto {
    
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string
    
    @IsString()
    @IsNotEmpty()
    code: string
}

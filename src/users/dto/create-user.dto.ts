import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  user_name: string
  @IsEmail()
  @IsNotEmpty()
  email: string
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @IsNotEmpty()
  password: string
}

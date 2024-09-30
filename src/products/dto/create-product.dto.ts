import { IsString, IsNumber, IsNotEmpty } from 'class-validator'

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string
  @IsNumber()
  @IsNotEmpty()
  category: number
  @IsString()
  description: string
  @IsNumber()
  @IsNotEmpty()
  price: number
  @IsNumber()
  @IsNotEmpty()
  stock: number
}

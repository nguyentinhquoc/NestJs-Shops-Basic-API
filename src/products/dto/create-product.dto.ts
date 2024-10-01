import { IsString, IsNumber, IsNotEmpty } from 'class-validator'
import { Category } from 'src/categories/entities/category.entity'

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string
  @IsNumber()
  @IsNotEmpty()
  category: Category
  @IsString()
  description: string
  @IsNumber()
  @IsNotEmpty()
  price: number
  @IsNumber()
  @IsNotEmpty()
  stock: number
}

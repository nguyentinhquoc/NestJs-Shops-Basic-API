import { IsInt, IsNotEmpty, IsPositive } from 'class-validator'
import { Type } from 'class-transformer'
import { Product } from 'src/products/entities/product.entity'
export class CreateCartDto {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  quantity: number
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  product: Product
}

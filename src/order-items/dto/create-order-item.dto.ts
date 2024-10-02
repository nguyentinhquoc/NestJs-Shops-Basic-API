import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator'
import { Type } from 'class-transformer'
import { Product } from 'src/products/entities/product.entity'
import { Order } from 'src/orders/entities/order.entity'

export class CreateOrderItemDto {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  product: Product

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  quantity: number

  @IsNotEmpty()
  @IsInt()
  order: Order
}

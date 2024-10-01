import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator'
import { Type } from 'class-transformer'

export class CreateOrderItemDto {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  product: number

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  quantity: number

  @IsNotEmpty()
  @IsInt()
  order: number
}

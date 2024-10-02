import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsPhoneNumber,
  IsArray,
  IsEnum,
} from 'class-validator'
import { OrderStatus } from 'src/enum/orderStatus.enum'

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  total: number

  @IsOptional()
  @IsEnum(OrderStatus)
  statusOrder?: OrderStatus

  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string

  @IsString()
  @IsNotEmpty()
  address: string

  @IsString()
  @IsNotEmpty()
  fullName: string

  @IsArray()
  @IsNotEmpty({ each: true })
  idCart: number
}

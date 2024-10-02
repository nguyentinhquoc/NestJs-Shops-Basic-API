import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator'
import { Product } from 'src/products/entities/product.entity'
import { User } from 'src/users/entities/user.entity'

export class CreateReviewDto {
  @IsNotEmpty()
  @IsString()
  comment: string

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  star: number
}

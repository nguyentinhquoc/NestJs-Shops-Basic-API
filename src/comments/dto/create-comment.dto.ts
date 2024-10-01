import { IsNotEmpty, IsString, IsNumber } from 'class-validator'
import { Product } from 'src/products/entities/product.entity'
import { User } from 'src/users/entities/user.entity'
import { DeepPartial } from 'typeorm'

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  content: string

  @IsNotEmpty()
  @IsNumber()
  user?: DeepPartial<User>

  @IsNotEmpty()
  @IsNumber()
  product?: DeepPartial<Product>
}

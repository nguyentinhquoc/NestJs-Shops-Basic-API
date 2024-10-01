import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator'

export class CreateReviewDto {
  @IsNotEmpty()
  @IsString()
  comment: string

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  start: number

  @IsNotEmpty()
  @IsNumber()
  user: number

  @IsNotEmpty()
  @IsNumber()
  product: number
}

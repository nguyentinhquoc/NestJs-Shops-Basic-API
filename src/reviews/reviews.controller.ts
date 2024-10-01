import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common'
import { ReviewsService } from './reviews.service'
import { CreateReviewDto } from './dto/create-review.dto'
import { UpdateReviewDto } from './dto/update-review.dto'
import { Admin } from 'src/decorater/Admin.decorator'

@Controller('reviews')
export class ReviewsController {
  constructor (private readonly reviewsService: ReviewsService) {}

  @Post()
  create (@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto)
  }

  @Get()
  findAll (@Admin() req, @Query('page') page: number = 1) {
    return this.reviewsService.findAll(page)
  }

  @Get(':id')
  findOne (@Param('id') id: string) {
    return this.reviewsService.findOne(+id)
  }

  @Patch(':id')
  update (
    @Admin() req,
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewsService.update(+id, updateReviewDto)
  }

  @Delete(':id')
  remove (@Admin() req, @Param('id') id: string) {
    return this.reviewsService.remove(+id)
  }
  @Post('/restore/:id')
  restore (@Admin() req, @Param('id') id: string) {
    return this.reviewsService.restore(+id)
  }
}

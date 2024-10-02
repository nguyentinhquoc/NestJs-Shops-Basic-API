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
import { AllUser } from 'src/decorater/AllUser.decorator'
import { OrdersService } from 'src/orders/orders.service'
import { OrderItemsService } from 'src/order-items/order-items.service'
import { isArray, isNumber } from 'class-validator'
import { OrderStatus } from 'src/enum/orderStatus.enum'
import { log } from 'console'

@Controller('reviews')
export class ReviewsController {
  constructor (
    private readonly reviewsService: ReviewsService,
    private readonly ordersService: OrdersService,
    private readonly orderItemsService: OrderItemsService,
  ) {}

  @Post(':idProduct')
  async create (
    @AllUser() req,
    @Param('idProduct') idProduct,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    const AllOrderWUser = await this.ordersService.findAllWUser(req.user.id)
    var AllIdOrder: number[] = []
    if (Array.isArray(AllOrderWUser)) {
      AllOrderWUser.map(item => {
        AllIdOrder = [...AllIdOrder, item.id]
      })
    }
    var results = await Promise.all(
      AllIdOrder.map(async idOrder => {
        if (await this.orderItemsService.checkCanReview(idProduct, idOrder)) {
          return await this.orderItemsService.checkCanReview(idProduct, idOrder)
        } else {
          return false
        }
      }),
    )
    results = results.filter(item => item !== false)
    var Check = false
    if (results) {
      if (isNumber(results[0])) {
        Check = true
        this.reviewsService.create(req.user.id, idProduct, createReviewDto)
        return this.orderItemsService.updateReview(results[0])
      }
      if (!Check) {
        return { message: 'Không thể đánh giá' }
      }
    }
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

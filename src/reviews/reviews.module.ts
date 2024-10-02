import { Module } from '@nestjs/common'
import { ReviewsService } from './reviews.service'
import { ReviewsController } from './reviews.controller'
import { Review } from './entities/review.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrdersModule } from 'src/orders/orders.module'
import { Order } from 'src/orders/entities/order.entity'
import { OrderItemsModule } from 'src/order-items/order-items.module'
import { OrderItem } from 'src/order-items/entities/order-item.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Review, Order, OrderItem]),
    OrdersModule,
    OrderItemsModule,
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}

import { Module } from '@nestjs/common'
import { OrdersService } from './orders.service'
import { OrdersController } from './orders.controller'
import { Order } from './entities/order.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Cart } from 'src/carts/entities/cart.entity'
import { OrderItem } from 'src/order-items/entities/order-item.entity'
import { CartsModule } from 'src/carts/carts.module'
import { OrderItemsModule } from 'src/order-items/order-items.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Cart, OrderItem]),
    CartsModule,
    OrderItemsModule,
  ],

  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}

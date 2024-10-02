import { Module } from '@nestjs/common'
import { OrdersService } from './orders.service'
import { OrdersController } from './orders.controller'
import { Order } from './entities/order.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Cart } from 'src/carts/entities/cart.entity'
import { OrderItem } from 'src/order-items/entities/order-item.entity'
import { CartsModule } from 'src/carts/carts.module'
import { OrderItemsModule } from 'src/order-items/order-items.module'
import { ProductsModule } from 'src/products/products.module'
import { Product } from 'src/products/entities/product.entity'
import { UsersModule } from 'src/users/users.module'
import { User } from 'src/users/entities/user.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Cart, OrderItem, Product,User]),
    CartsModule,
    OrderItemsModule,
    ProductsModule,
    UsersModule
  ],

  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}

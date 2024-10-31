import { Post } from './posts/entities/post.entity'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DataSource } from 'typeorm'
import { UsersModule } from './users/users.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './users/entities/user.entity'
import { ProductsModule } from './products/products.module'
import { CategoriesModule } from './categories/categories.module'
import { Product } from './products/entities/product.entity'
import { Category } from './categories/entities/category.entity'
import { CommentsModule } from './comments/comments.module'
import { CartsModule } from './carts/carts.module'
import { ReviewsModule } from './reviews/reviews.module'
import { OrdersModule } from './orders/orders.module'
import { OrderItemsModule } from './order-items/order-items.module'
import { Review } from './reviews/entities/review.entity'
import { PostsModule } from './posts/posts.module'
import { Comment } from './comments/entities/comment.entity'
import { Cart } from './carts/entities/cart.entity'
import { Order } from './orders/entities/order.entity'
import { OrderItem } from './order-items/entities/order-item.entity'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './auth/jwt-auth.guard'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'shops-nest-api',
      entities: [
        User,
        Product,
        Category,
        Review,
        Post,
        Comment,
        Cart,
        Order,
        OrderItem,
      ],
      synchronize: true,
    }),
    UsersModule,
    ProductsModule,
    CategoriesModule,
    CommentsModule,
    CartsModule,
    ReviewsModule,
    OrdersModule,
    OrderItemsModule,
    PostsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {
  constructor (private dataSource: DataSource) {}
}

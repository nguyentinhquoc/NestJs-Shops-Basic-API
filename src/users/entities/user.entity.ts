import { Cart } from 'src/carts/entities/cart.entity'
import { Comment } from 'src/comments/entities/comment.entity'
import { Order } from 'src/orders/entities/order.entity'
import { Review } from 'src/reviews/entities/review.entity'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  user_name: string

  @Column()
  password: string

  @Column()
  email: string

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedDate: Date

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date

  @OneToMany(() => Review, Review => Review.id)
  Review: Review[]

  @OneToMany(() => Comment, Comment => Comment.id)
  Comment: Comment[]

  @OneToMany(() => Cart, Cart => Cart.id)
  Cart: Cart[]
  @OneToMany(() => Order, Order => Order.id)
  Order: Order[]
}

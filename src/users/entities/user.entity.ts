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
  @Column({ default: 'user' })
  role: string
  @Column()
  email: string
  @CreateDateColumn()
  createdDate: Date
  @UpdateDateColumn()
  updatedDate: Date
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date
  @OneToMany(() => Review, review => review.user)
  review: Review[]
  @OneToMany(() => Comment, Comment => Comment.user)
  comment: Comment[]
  @OneToMany(() => Cart, Cart => Cart.user)
  cart: Cart[]
  @OneToMany(() => Order, Order => Order.user)
  order: Order[]
}

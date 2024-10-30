import { Cart } from '../../carts/entities/cart.entity'
import { Category } from '../../categories/entities/category.entity'
import { Comment } from '../../comments/entities/comment.entity'
import { OrderItem } from '../../order-items/entities/order-item.entity'
import { Review } from '../../reviews/entities/review.entity'
import { User } from '../../users/entities/user.entity'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm'
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  name: string
  @Column()
  stock: number
  @Column()
  price: number
  @Column()
  description: string
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date
  @ManyToOne(() => Category, category => category.product)
  category: Category
  @OneToMany(() => Comment, comment => comment.product)
  comment: Comment[]
  @OneToMany(() => Review, review => review.product)
  review: Review[]
  @OneToMany(() => Cart, Cart => Cart.product)
  cart: Cart[]
  @OneToMany(() => OrderItem, orderItem => orderItem.product)
  orderItem: OrderItem[]
}

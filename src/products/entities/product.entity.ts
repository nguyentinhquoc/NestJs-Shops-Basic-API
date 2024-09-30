import { Cart } from 'src/carts/entities/cart.entity'
import { Category } from 'src/categories/entities/category.entity'
import { Comment } from 'src/comments/entities/comment.entity'
import { OrderItem } from 'src/order-items/entities/order-item.entity'
import { Review } from 'src/reviews/entities/review.entity'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany
} from 'typeorm'

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number
  @ManyToOne(() => Category, Category => Category.id)
  category: number
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
  @OneToMany(() => Review, Review => Review.id)
  Review: Review[]
  @OneToMany(() => Comment, Comment => Comment.id)
  Comment: Comment[]
  @OneToMany(() => Cart, Cart => Cart.id)
  Cart: Cart[]
  @OneToMany(() => OrderItem, OrderItem => OrderItem.id)
  OrderItem: OrderItem[]
}

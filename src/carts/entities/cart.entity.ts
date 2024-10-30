import { Product } from '../../products/entities/product.entity'
import { User } from '../../users/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number
  @ManyToOne(() => User, User => User.cart)
  user: number
  @ManyToOne(() => Product, Product => Product.cart)
  product: Product

  @Column()
  quantity: number

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date
}

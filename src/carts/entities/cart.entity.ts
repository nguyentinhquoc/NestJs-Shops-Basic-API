import { Product } from 'src/products/entities/product.entity'
import { User } from 'src/users/entities/user.entity'
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
  @ManyToOne(() => User, User => User.id)
  user: number
  @ManyToOne(() => Product, Product => Product.id)
  product: number
  @Column()
  quantity: number

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date
}

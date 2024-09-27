import { Product } from 'src/products/entities/product.entity'
import { User } from 'src/users/entities/user.entity'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm'

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  content: string
  @ManyToOne(
    () => User,
    User => {
      User.id
    },
  )
  user: number

  @ManyToOne(
    () => Product,
    Product => {
      Product.id
    },
  )
  product: number

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date
}
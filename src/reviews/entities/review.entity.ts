import { Product } from 'src/products/entities/product.entity'
import { User } from 'src/users/entities/user.entity'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  ManyToOne,
} from 'typeorm'

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  comment: string

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

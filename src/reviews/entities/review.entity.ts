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
export class Review {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  comment: string

  @Column()
  star: number

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date
  @ManyToOne(() => User, user => user.review)
  user: User

  @ManyToOne(() => Product, product => product.review)
  product: Product
}

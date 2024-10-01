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

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date

  @ManyToOne(() => Product, product => product.comment)
  product: Product

  @ManyToOne(() => User, user => user.comment)
  user: User
}

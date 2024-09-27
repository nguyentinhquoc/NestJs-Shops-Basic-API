import { OrderItem } from 'src/order-items/entities/order-item.entity'
import { User } from 'src/users/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  total: number

  @Column()
  status: string

  @ManyToOne(
    () => User,
    User => {
      User.id
    },
  )
  user: number

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date
    @OneToMany(() => OrderItem, OrderItem => OrderItem.id)
  OrderItem: OrderItem[]
}

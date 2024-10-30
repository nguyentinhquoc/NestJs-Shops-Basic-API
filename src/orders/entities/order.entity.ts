import { OrderStatus } from 'src/enum/orderStatus.enum'
import { OrderItem } from '../../order-items/entities/order-item.entity'
import { User } from '../../users/entities/user.entity'
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

  @Column({
    default: "PENDING",
  })
  statusOrder: string

  @Column()
  phone: string

  @Column()
  address: string

  @Column()
  fullName: string

  @Column()
  payment: boolean

  @Column()
  orderId: string

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date
  @OneToMany(() => OrderItem, orderItem => orderItem.order)
  orderItems: OrderItem[]
  @ManyToOne(() => User, user => user.order)
  user: User
}

import { OrderStatus } from 'src/enum/orderStatus.enum'
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

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  statusOrder: OrderStatus

  @Column()
  phone: string

  @Column()
  address: string

  @Column()
  fullName: string

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date
  @OneToMany(() => OrderItem, orderItem => orderItem.order)
    orderItems: OrderItem[];
  @ManyToOne(() => User, user => user.order)
  user: User
}

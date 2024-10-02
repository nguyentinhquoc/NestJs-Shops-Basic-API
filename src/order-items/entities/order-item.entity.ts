import { Order } from 'src/orders/entities/order.entity'
import { Product } from 'src/products/entities/product.entity'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  quantity: number
  @Column({ default: false })
  review: boolean

  @ManyToOne(() => Order, order => order.orderItems)
  order: Order

  @ManyToOne(() => Product, Product => Product.orderItem)
  product: Product

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date
}

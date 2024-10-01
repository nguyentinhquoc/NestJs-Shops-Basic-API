import { Order } from 'src/orders/entities/order.entity'
import { Product } from 'src/products/entities/product.entity'
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
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  quantity: number

  @ManyToOne(() => Order, order => order.orderItem)
  order: number

  @ManyToOne(() => Product, Product => Product.orderItem)
  product: number

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date
}

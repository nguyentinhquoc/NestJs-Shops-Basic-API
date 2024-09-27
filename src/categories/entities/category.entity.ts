import { Product } from 'src/products/entities/product.entity'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm'

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  name: string

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date

  @OneToMany(() => Product, product => product.category)
  products: Product[]
}

import { Injectable } from '@nestjs/common'
import { CreateOrderItemDto } from './dto/create-order-item.dto'
import { UpdateOrderItemDto } from './dto/update-order-item.dto'
import { OrderItem } from './entities/order-item.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class OrderItemsService {
  constructor (
    @InjectRepository(OrderItem)
    private orderItemsRepository: Repository<OrderItem>,
  ) {}
  async create (createOrderItemDto: CreateOrderItemDto) {
    try {
      const data = await this.orderItemsRepository.create(createOrderItemDto)
      await this.orderItemsRepository.save(data)
      return {
        message: 'Created successfully',
      }
    } catch (error) {
      return {
        error: error.message || error,
      }
    }
  }

  findAll () {
    return `This action returns all orderItems`
  }

  findOne (id: number) {
    return `This action returns a #${id} orderItem`
  }

  update (id: number, updateOrderItemDto: UpdateOrderItemDto) {
    return `This action updates a #${id} orderItem`
  }

  remove (id: number) {
    return `This action removes a #${id} orderItem`
  }
}

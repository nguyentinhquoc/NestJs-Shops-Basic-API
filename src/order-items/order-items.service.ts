import { Injectable, NotFoundException } from '@nestjs/common'
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
  async checkCanReview (idProduct: number, idOrder: number) {
    try {
      const dataCheck = await this.orderItemsRepository.findOne({
        where: {
          product: { id: idProduct },
          order: { id: idOrder },
          review: false,
        },
      })
      if (!dataCheck) {
        throw new NotFoundException(`Not found`)
      }
      return dataCheck.id
    } catch (error) {
      return null
    }
  }

  update (id: number, updateOrderItemDto: UpdateOrderItemDto) {
    return `This action updates a #${id} orderItem`
  }
  async updateReview (id: number) {
    try {
      const result = await this.orderItemsRepository.update(id, {
        review: true,
      })
      if (result.affected === 0) {
        throw new NotFoundException(`Review with ID ${id} not found`)
      }
      return result
    } catch (error) {
      throw new Error(`Failed to update review: ${error.message}`)
    }
  }

  remove (id: number) {
    return `This action removes a #${id} orderItem`
  }
}

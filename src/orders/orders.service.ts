import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Order } from './entities/order.entity'
import { Repository } from 'typeorm'
import { OrderItem } from 'src/order-items/entities/order-item.entity'
import { Cart } from 'src/carts/entities/cart.entity'
import { OrderStatus } from 'src/enum/orderStatus.enum'

@Injectable()
export class OrdersService {
  constructor (
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async create (idUser, createOrderDto: CreateOrderDto) {
    try {
      const data = await this.ordersRepository.create({
        total: createOrderDto.total,
        phone: createOrderDto.phone,
        address: createOrderDto.address,
        fullName: createOrderDto.fullName,
        user: idUser,
      })
      await this.ordersRepository.save(data)
      return {
        message: 'Created successfully',
        data,
      }
    } catch (error) {
      return {
        error: error.message || error,
      }
    }
  }

  async cancelOrder (id: number) {
    try {
      await this.ordersRepository.update(id, {
        statusOrder: OrderStatus.CANCELLED,
      })
      return {
        message: 'Cancel successfully',
      }
    } catch (error) {
      return {
        error: error.message || error,
      }
    }
  }
  findAll () {
    return `This action returns all orders`
  }

  async findOne (id: number) {
    try {
      const dataCheck = await this.ordersRepository.findOne({ where: { id } })
      if (!dataCheck) {
        throw new NotFoundException(`Not found`)
      }
      return dataCheck
    } catch (error) {
      return {
        error: error.message || error,
      }
    }
  }
  async findOneStatus (id: number) {
    try {
      const dataCheck = await this.ordersRepository.findOne({ where: { id } })
      if (!dataCheck) {
        throw new NotFoundException(`Not found`)
      }
      return dataCheck.statusOrder
    } catch (error) {
      return {
        error: error.message || error,
      }
    }
  }

  update (id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`
  }

  async delete (id: number) {
    try {
      const dataCheck = await this.ordersRepository.findOne({ where: { id } })
      if (!dataCheck) {
        throw new NotFoundException(`Not found`)
      }
      await this.ordersRepository.delete(id)
      return {
        message: 'Deleted successfully',
      }
    } catch (error) {
      return {
        error: error.message || error,
      }
    }
  }
}

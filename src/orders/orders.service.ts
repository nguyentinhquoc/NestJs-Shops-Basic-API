import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Order } from './entities/order.entity'
import { Repository } from 'typeorm'
import { OrderItem } from 'src/order-items/entities/order-item.entity'
import { Cart } from 'src/carts/entities/cart.entity'
import { OrderStatus } from 'src/enum/orderStatus.enum'
import { relative } from 'path'

@Injectable()
export class OrdersService {
  constructor (
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async findAll (page: number) {
    try {
      return await this.ordersRepository.find({
        take: 10,
        skip: (page - 1) * 10,
        relations: ['orderItems'],
      })
    } catch (error) {
      return {
        error: error.message || error,
      }
    }
  }

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

  async changeStatus (id: number, statusChange) {
    try {
      await this.ordersRepository.update(id, {
        statusOrder: statusChange,
      })
      return {
        message: 'change status successfully',
      }
    } catch (error) {
      return {
        error: error.message || error,
      }
    }
  }
  async findAllWUser (idUser) {
    try {
      const dataCheck = await this.ordersRepository.find({
        where: { user: idUser, statusOrder: OrderStatus.COMPLETED },
      })
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

  async remove (id: number) {
    try {
      const dataCheck = await this.ordersRepository.findOne({ where: { id } })
      if (!dataCheck) {
        throw new NotFoundException(`Not found`)
      }
      await this.ordersRepository.softDelete(id)
      return {
        message: 'Deleted successfully',
      }
    } catch (error) {
      return {
        error: error.message || error,
      }
    }
  }
  async restore (id: number) {
    try {
      const dataCheck = await this.ordersRepository.findOne({
        where: { id },
        withDeleted: true,
      })
      if (!dataCheck) {
        throw new NotFoundException(`Not found`)
      }
      await this.ordersRepository.restore(id)
      return { message: 'Khôi phục thành công' }
    } catch (error) {
      return {
        error: error.message || error,
      }
    }
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

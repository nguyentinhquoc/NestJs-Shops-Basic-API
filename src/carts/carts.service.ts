import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateCartDto } from './dto/create-cart.dto'
import { UpdateCartDto } from './dto/update-cart.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Cart } from './entities/cart.entity'
import { Repository } from 'typeorm'
import { User } from 'src/users/entities/user.entity'

@Injectable()
export class CartsService {
  constructor (
    @InjectRepository(Cart)
    private cartsRepository: Repository<Cart>,
  ) {}
  async create (idUser, createCartDto: CreateCartDto) {
    try {
      const data = await this.cartsRepository.create({
        quantity: createCartDto.quantity,
        user: idUser,
        product: createCartDto.product,
      })
      await this.cartsRepository.save(data)
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

  findAll () {
    return `This action returns all carts`
  }

  async findOne (id: number) {
    try {
      const cart = await this.cartsRepository.findOne({
        where: { id },
        relations: ['product'],
      })
      if (!cart) {
        return null
      }
      return {
        id: cart.id,
        quantity: cart.quantity,
        createdAt: cart.createdAt,
        updatedAt: cart.updatedAt,
        deletedAt: cart.deletedAt,
        product: cart.product.id,
      }
    } catch (error) {
      return {
        error: error.message || error,
      }
    }
  }
  update (id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`
  }

  async remove (id: number) {
    try {
      const dataCheck = await this.cartsRepository.findOne({ where: { id } })
      if (!dataCheck) {
        throw new NotFoundException(`Not found`)
      }
      await this.cartsRepository.delete(id)
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

import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { Product } from './entities/product.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
@Injectable()
export class ProductsService {
  constructor (
    @InjectRepository(Product)
    private prodcutsRepository: Repository<Product>,
  ) {}

  async create (createProductDto: CreateProductDto) {
    try {
      const data = this.prodcutsRepository.create(createProductDto)
      await this.prodcutsRepository.save(data)
      return {
        message: 'Product created successfully',
        data,
      }
    } catch (error) {
      return {
        error: error.message || error,
      }
    }
  }
  findAll (page: number) {
    try {
      return this.prodcutsRepository.find({
        take: 10,
        skip: (page - 1) * 10,
      })
    } catch (error) {
      return {
        error: error.message || error,
      }
    }
  }

  findOne (id: number) {
    try {
      return this.prodcutsRepository.findOne({ where: { id } })
    } catch (error) {
      return {
        error: error.message || error,
      }
    }
  }

  async update (id: number, updateProductDto: UpdateProductDto) {
    try {
      const data = await this.prodcutsRepository.update(id, updateProductDto)
      return {
        message: 'Edit successfully',
      }
    } catch (error) {
      return {
        error: error.message || error,
      }
    }
  }

  remove (id: number) {
    try {
      this.prodcutsRepository.softDelete(id)
      return {
        message: 'Product deleted successfully',
      }
    } catch (error) {
      return {
        error: error.message || error,
      }
    }
  }
  async restore (id: number) {
    try {
      await this.prodcutsRepository.restore(id)
      return { message: 'Khôi phục thành công' }
    } catch (error) {
      return {
        error: error.message || error,
      }
    }
  }
}

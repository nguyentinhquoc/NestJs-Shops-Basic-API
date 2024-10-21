import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
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
      const data = await this.prodcutsRepository.create(createProductDto)
      await this.prodcutsRepository.save(data)
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
 async findAll (page: number) {
    try {
      return await this.prodcutsRepository.find({
        take: 10,
        skip: (page - 1) * 10,
      })
    } catch (error) {
      return {
        error: error.message || error,
      }
    }
  }

  async findOne (id: number) {
    try {
      const dataCheck = await this.prodcutsRepository.findOne({ where: { id } })
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

  async update (id: number, updateProductDto: UpdateProductDto) {
    try {
      const dataCheck = await this.prodcutsRepository.findOne({ where: { id } })
      if (!dataCheck) {
        throw new NotFoundException(`Not found`)
      }
      await this.prodcutsRepository.update(id, updateProductDto)
      return {
        message: 'Edit successfully',
      }
    } catch (error) {
      return {
        error: error.message || error,
      }
    }
  }
async updateStock (id: number, quantity: number) {
    try {
      const dataCheck = await this.prodcutsRepository.findOne({ where: { id } })
      if (!dataCheck) {
        throw new NotFoundException(`Not found`)
      }
      await this.prodcutsRepository.update(id, {
        stock: dataCheck.stock - quantity,
      })
      return {
        message: 'Edit successfully',
      }
    } catch (error) {
      return {
        error: error.message || error,
      }
    }
  }
  async remove (id: number) {
    try {
      const dataCheck = await this.prodcutsRepository.findOne({ where: { id } })
      if (!dataCheck) {
        throw new NotFoundException(`Not found`)
      }
      await this.prodcutsRepository.softDelete(id)
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
      const dataCheck = await this.prodcutsRepository.findOne({
        where: { id },
        withDeleted: true,
      })
      if (!dataCheck) {
        throw new NotFoundException(`Not found`)
      }
      await this.prodcutsRepository.restore(id)
      return { message: 'Khôi phục thành công' }
    } catch (error) {
      return {
        error: error.message || error,
      }
    }
  }
}

import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { Category } from './entities/category.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
@Injectable()
export class CategoriesService {
  constructor (
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async restore (id: number) {
    try {
      await this.categoriesRepository.restore(id)
      return { message: 'Khôi phục thành công' }
    } catch (error) {
      return {
        error: error.message || error,
      }
    }
  }
  async create (createCategoryDto: CreateCategoryDto) {
    try {
      const newCategory = this.categoriesRepository.create(createCategoryDto)
      const data = await this.categoriesRepository.save(newCategory)
      return {
        message: 'Thêm thành công',
        data,
      }
    } catch (error) {
      return {
        error: error.message || error,
      }
    }
  }

  findAll () {
    try {
      return this.categoriesRepository.find()
    } catch (error) {
      return {
        error: error.message || error,
      }
    }
  }

  async findOne (id: number) {
    try {
      const category = await this.categoriesRepository.findOneBy({ id })
      if (!category) {
        throw new NotFoundException(`Category with ID ${id} not found`)
      }
      return category
    } catch (error) {
      return {
        error: error.message || error,
      }
    }
  }

  async update (id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.categoriesRepository.findOneBy({ id })
      if (!category) {
        throw new NotFoundException(`Category with ID ${id} not found`)
      }
      await this.categoriesRepository.update(id, updateCategoryDto)
      return { message: 'Sửa thành công' }
    } catch (error) {
      return { error: error.message || error }
    }
  }

  async remove (id: number) {
    const category = await this.categoriesRepository.findOneBy({ id })
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`)
    }
    await this.categoriesRepository.softDelete(id)
    return { message: 'Xóa thành công' }
  }
}

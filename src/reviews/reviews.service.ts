import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateReviewDto } from './dto/create-review.dto'
import { UpdateReviewDto } from './dto/update-review.dto'
import { Review } from './entities/review.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class ReviewsService {
  constructor (
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
  ) {}

  async create (IdUser,idProduct, createReviewDto: CreateReviewDto) {
    try {
      const data = await this.reviewsRepository.create({
        product:idProduct,
        user: IdUser,
        ...createReviewDto,
      })
      await this.reviewsRepository.save(data)
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
      return await this.reviewsRepository.find({
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
    return `This action returns a #${id} review`
  }

  update (id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`
  }

  async remove (id: number) {
    try {
      const dataCheck = await this.reviewsRepository.findOne({ where: { id } })
      if (!dataCheck) {
        throw new NotFoundException(`Not found`)
      }
      await this.reviewsRepository.softDelete(id)
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
      const dataCheck = await this.reviewsRepository.findOne({
        where: { id },
        withDeleted: true,
      })
      if (!dataCheck) {
        throw new NotFoundException(`Not found`)
      }
      await this.reviewsRepository.restore(id)
      return { message: 'Khôi phục thành công' }
    } catch (error) {
      return {
        error: error.message || error,
      }
    }
  }
}

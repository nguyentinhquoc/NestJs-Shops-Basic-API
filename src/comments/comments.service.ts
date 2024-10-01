import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'
import { DeepPartial, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Comment } from './entities/comment.entity'

@Injectable()
export class CommentsService {
  constructor (
    @InjectRepository(Comment)
    private comentsRepository: Repository<Comment>,
  ) {}
  async create (createCommentDto: CreateCommentDto) {
    console.log(createCommentDto)
    try {
      const data = await this.comentsRepository.create(createCommentDto)
      await this.comentsRepository.save(data)
      return {
        message: 'reated successfully',
        data,
      }
    } catch (error) {
      return {
        error: error.message || error,
      }
    }
  }

  findOne (id: number) {
    return `This action returns a #${id} comment`
  }

  update (id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`
  }
  async findAllUser (page: number, productId: number) {
    try {
      return await this.comentsRepository.find({
        where: { product: { id: productId } },
        take: 10,
        skip: (page - 1) * 10,
      })
    } catch (error) {
      return {
        error: error.message || error,
      }
    }
  }
  async findAll (page: number) {
    try {
      return await this.comentsRepository.find({
        take: 10,
        skip: (page - 1) * 10,
      })
    } catch (error) {
      return {
        error: error.message || error,
      }
    }
  }
  async remove (id: number) {
    try {
      const dataCheck = await this.comentsRepository.findOne({ where: { id } })
      if (!dataCheck) {
        throw new NotFoundException(`Not found`)
      }
      await this.comentsRepository.softDelete(id)
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
      const dataCheck = await this.comentsRepository.findOne({
        where: { id },
        withDeleted: true,
      })
      if (!dataCheck) {
        throw new NotFoundException(`Not found`)
      }
      await this.comentsRepository.restore(id)
      return { message: 'Khôi phục thành công' }
    } catch (error) {
      return {
        error: error.message || error,
      }
    }
  }
}

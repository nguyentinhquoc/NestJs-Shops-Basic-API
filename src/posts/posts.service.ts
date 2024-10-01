import { Injectable, NotFoundException } from '@nestjs/common'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { Post } from './entities/post.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class PostsService {
  constructor (
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async create (createPostDto: CreatePostDto) {
    try {
      const data = await this.postsRepository.create(createPostDto)
      await this.postsRepository.save(data)
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
 async findAll (page: number) {
    try {
      return await this.postsRepository.find({
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
      const dataCheck = await this.postsRepository.findOne({ where: { id } })
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

  async update (id: number, updatePostDto: UpdatePostDto) {
    try {
      const dataCheck = await this.postsRepository.findOne({ where: { id } })
      if (!dataCheck) {
        throw new NotFoundException(`Not found`)
      }
      await this.postsRepository.update(id, updatePostDto)
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
      const dataCheck = await this.postsRepository.findOne({ where: { id } })
      if (!dataCheck) {
        throw new NotFoundException(`Not found`)
      }
      await this.postsRepository.softDelete(id)
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
      const dataCheck = await this.postsRepository.findOne({
        where: { id },
        withDeleted: true,
      })
      if (!dataCheck) {
        throw new NotFoundException(`Not found`)
      }
      await this.postsRepository.restore(id)
      return { message: 'Khôi phục thành công' }
    } catch (error) {
      return {
        error: error.message || error,
      }
    }
  }
}

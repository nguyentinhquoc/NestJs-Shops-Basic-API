import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common'
import { PostsService } from './posts.service'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { Admin } from 'src/decorater/Admin.decorator'

@Controller('posts')
export class PostsController {
  constructor (private readonly postsService: PostsService) {}

  @Post()
  create (@Admin() req,@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto)
  }

  @Get()
  findAll (@Query('page') page: number = 1) {
    return this.postsService.findAll(page)
  }

  @Get(':id')
  findOne (@Param('id') id: string) {
    return this.postsService.findOne(+id)
  }

  @Patch(':id')
  update (@Admin() req,@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto)
  }

  @Delete(':id')
  remove (@Admin() req,@Param('id') id: string) {
    return this.postsService.remove(+id)
  }
  @Post('/restore/:id')
  restore (@Admin() req,@Param('id') id: string) {
    return this.postsService.restore(+id)
  }
}

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
import { CommentsService } from './comments.service'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'
import { Admin } from 'src/decorater/Admin.decorator'

@Controller('comments')
export class CommentsController {
  constructor (private readonly commentsService: CommentsService) {}

  @Post()
  create (@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto)
  }
  @Get()
  findAll (@Admin() req, @Query('page') page: number = 1) {
    return this.commentsService.findAll(page)
  }

  @Get(':id')
  findAllUser (@Query('page') page: number = 1, @Param('id') id: number) {
    return this.commentsService.findAllUser(+page, +id)
  }

  @Patch(':id')
  update (
    @Admin() req,
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.update(+id, updateCommentDto)
  }

  @Delete(':id')
  remove (@Admin() req, @Param('id') id: string) {
    return this.commentsService.remove(+id)
  }
  @Post('/restore/:id')
  restore (@Admin() req, @Param('id') id: string) {
    return this.commentsService.restore(+id)
  }
}

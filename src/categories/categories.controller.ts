import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { Admin } from 'src/decorater/Admin.decorator'

@Controller('categories')
export class CategoriesController {
  constructor (private readonly categoriesService: CategoriesService) {}
  @Post('/restore/:id')
  restore (@Admin() req, @Param('id') id: number) {
    return this.categoriesService.restore(+id)
  }
  @Post()
  create (@Admin() req, @Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto)
  }

  @Get()
  findAll () {
    return this.categoriesService.findAll()
  }

  @Get(':id')
  findOne (@Param('id') id: string) {
    return this.categoriesService.findOne(+id)
  }

  @Patch(':id')
  update (
    @Admin() req,
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto)
  }

  @Delete(':id')
  remove (@Admin() req, @Param('id') id: string) {
    return this.categoriesService.remove(+id)
  }
}

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
import { ProductsService } from './products.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { Admin } from '../decorater/Admin.decorator'

@Controller('products')
export class ProductsController {
  constructor (private readonly productsService: ProductsService) {}

  @Post()
  create (@Admin() req, @Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto)
  }

  @Get()
  findAll (@Query('page') page: number = 1) {
    return this.productsService.findAll(page)
  }

  @Get(':id')
  findOne (@Param('id') id: string) {
    return this.productsService.findOne(+id)
  }

  @Patch(':id')
  update (@Admin() req,@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto)
  }

  @Delete(':id')
  remove (@Admin() req,@Param('id') id: string) {
    return this.productsService.remove(+id)
  }
  @Post('/restore/:id')
  restore (@Admin() req,@Param('id') id: string) {
    return this.productsService.restore(+id)
  }
}

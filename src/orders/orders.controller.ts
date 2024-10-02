import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Query,
} from '@nestjs/common'
import { OrdersService } from './orders.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { AllUser } from 'src/decorater/AllUser.decorator'
import { CartsService } from 'src/carts/carts.service'
import { OrderItemsService } from 'src/order-items/order-items.service'
import { OrderStatus } from 'src/enum/orderStatus.enum'
import { ProductsService } from 'src/products/products.service'
import { UsersService } from 'src/users/users.service'
import { isArray } from 'class-validator'
import { Admin } from 'src/decorater/Admin.decorator'

@Controller('orders')
export class OrdersController {
  constructor (
    private readonly ordersService: OrdersService,
    private readonly cartsService: CartsService,
    private readonly orderItemsService: OrderItemsService,
    private readonly productsService: ProductsService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  findAll (@Admin() req,@Query('page') page: number = 1) {
    return this.ordersService.findAll(page)
  }

  @Post()
  async create (@AllUser() req, @Body() createOrderDto: CreateOrderDto) {
    try {
      var checkActionOrder = true
      const OrderCreate = await this.ordersService.create(
        req.user.id,
        createOrderDto,
      )
      var ArrIdCart: number[] = []
      if (isArray(createOrderDto.idCart)) {
        createOrderDto.idCart.map(item => {
          ArrIdCart.push(item)
        })
      } else {
        ArrIdCart.push(createOrderDto.idCart)
      }
      const actionOrder = await Promise.all(
        ArrIdCart.map(async (id: number) => {
          const dataCart = await this.cartsService.findOne(id)
          if (!dataCart) {
            await this.ordersService.delete(OrderCreate.data.id)
            return (checkActionOrder = false)
          }
          await this.cartsService.remove(id)
          const DtProduct = await this.productsService.findOne(dataCart.product)
          if (!DtProduct || 'error' in DtProduct) {
            throw new NotFoundException(
              `Product with ID ${dataCart.product} not found`,
            )
          }
          const DtOrder = await this.ordersService.findOne(OrderCreate.data.id)
          if (!DtOrder || 'error' in DtOrder) {
            throw new NotFoundException(
              `Product with ID ${OrderCreate.data.id} not found`,
            )
          }

          const orderItem = await this.orderItemsService.create({
            product: DtProduct, // Truyền đối tượng Product
            quantity: dataCart.quantity,
            order: DtOrder,
          })
        }),
      )
      if (checkActionOrder) {
        return {
          message: 'Đặt hàng thành công successfully',
        }
      }
      return {
        message: 'Đặt hàng thất bại giỏ hàng không tồn tại',
      }
    } catch (error) {}
  }

  @Patch('/cancelled/:id')
  async cancelOrderChangeStatus (@Admin() req,@Param('id') id: number) {
    const dataOrder = await this.ordersService.findOneStatus(id)
    if (dataOrder === OrderStatus.PENDING) {
      return this.ordersService.changeStatus(id, OrderStatus.CANCELLED)
    } else {
      return {
        message: 'Đơn hàng không thể hủy',
      }
    }
  }
  @Patch('/completed/:id')
  async completedOrderChangeStatus (@Admin() req,@Param('id') id: number) {
    const dataOrder = await this.ordersService.findOneStatus(id)
    if (
      dataOrder === OrderStatus.PENDING ||
      dataOrder === OrderStatus.PROCESSING
    ) {
      return this.ordersService.changeStatus(id, OrderStatus.COMPLETED)
    } else {
      return {
        message: 'Thất bại',
      }
    }
  }
  @Patch('/processing/:id')
  async processingOrderChangeStatus (@Admin() req,@Param('id') id: number) {
    const dataOrder = await this.ordersService.findOneStatus(id)
    if (dataOrder === OrderStatus.PENDING) {
      return this.ordersService.changeStatus(id, OrderStatus.PROCESSING)
    } else {
      return {
        message: 'Thất bại',
      }
    }
  }

  @Get(':id')
  findOne (@Param('id') id: string) {
    return this.ordersService.findOne(+id)
  }
  @Delete(':id')
  remove (@Admin() req, @Param('id') id: string) {
    return this.ordersService.remove(+id)
  }
  @Post('/restore/:id')
  restore (@Admin() req, @Param('id') id: string) {
    return this.ordersService.restore(+id)
  }
}

import { CartsModule } from 'src/carts/carts.module'
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  NotFoundException,
} from '@nestjs/common'
import { OrdersService } from './orders.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { User } from 'src/decorater/User.decorator'
import { CartsService } from 'src/carts/carts.service'
import { OrderItemsService } from 'src/order-items/order-items.service'
import { log } from 'console'
import { OrderStatus } from 'src/enum/orderStatus.enum'

@Controller('orders')
export class OrdersController {
  constructor (
    private readonly ordersService: OrdersService,
    private readonly cartsService: CartsService,
    private readonly orderItemsService: OrderItemsService,
  ) {}

  @Post()
  async create (@User() req, @Body() createOrderDto: CreateOrderDto) {
    try {
      var checkActionOrder = true
      const OrderCreate = await this.ordersService.create(
        req.user.id,
        createOrderDto,
      )
      const actionOrder = await Promise.all(
        createOrderDto.idCart.map(async (id: number) => {
          const dataCart = await this.cartsService.findOne(id)
          if (!dataCart) {
            this.ordersService.delete(OrderCreate.data.id)
            return (checkActionOrder = false)
          }
          await this.cartsService.remove(id)
          await this.orderItemsService.create({
            product: dataCart.product,
            quantity: dataCart.quantity,
            order: OrderCreate.data.id,
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

  @Patch('/:id')
  async cancelOrder (@Param('id') id: number) {
    const dataOrder = await this.ordersService.findOneStatus(id)
    if (dataOrder === OrderStatus.PENDING) {
      return this.ordersService.cancelOrder(id)
    } else {
      return {
        message: 'Đơn hàng đã được xử lý',
      }
    }
  }
  @Get(':id')
  findOne (@Param('id') id: string) {
    return this.ordersService.findOne(+id)
  }

  @Patch(':id')
  update (@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto)
  }

  @Delete(':id')
  remove (@Param('id') id: string) {
    return this.ordersService.delete(+id)
  }
}

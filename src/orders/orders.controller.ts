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
import axios from 'axios'
import { json } from 'stream/consumers'
import { Public } from 'src/decorater/NoLogin.decorator'
import { Order } from './entities/order.entity'

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
  findAll (@Admin() req, @Query('page') page: number = 1) {
    return this.ordersService.findAll(page)
  }

  @Post()
  async create (@AllUser() req, @Body() createOrderDto: CreateOrderDto) {
    try {
      var checkActionOrder = true
      var order_code = new Date().getTime()
      const OrderCreate = await this.ordersService.create(
        order_code,
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
        if (createOrderDto.payment == true) {
          var accessKey = 'F8BBA842ECF85'
          var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz'
          var orderInfo = 'pay with MoMo'
          var partnerCode = 'MOMO'
          var redirectUrl =
            'https://2c41-123-24-142-220.ngrok-free.app/orders/payment'
          var ipnUrl =
            'https://2c41-123-24-142-220.ngrok-free.app/orders/payment'
          var requestType = 'payWithMethod'
          var amount = createOrderDto.total
          var orderId = order_code
          var requestId = orderId
          var extraData = ''
          var orderGroupId = ''
          var autoCapture = true
          var lang = 'vi'
          var rawSignature =
            'accessKey=' +
            accessKey +
            '&amount=' +
            amount +
            '&extraData=' +
            extraData +
            '&ipnUrl=' +
            ipnUrl +
            '&orderId=' +
            orderId +
            '&orderInfo=' +
            orderInfo +
            '&partnerCode=' +
            partnerCode +
            '&redirectUrl=' +
            redirectUrl +
            '&requestId=' +
            requestId +
            '&requestType=' +
            requestType
          console.log(rawSignature)
          const crypto = require('crypto')
          var signature = crypto
            .createHmac('sha256', secretKey)
            .update(rawSignature)
            .digest('hex')
          console.log(signature)
          const requestBody = JSON.stringify({
            partnerCode: partnerCode,
            partnerName: 'Test',
            storeId: 'MomoTestStore',
            requestId: requestId,
            amount: amount,
            orderId: orderId,
            orderInfo: orderInfo,
            redirectUrl: redirectUrl,
            ipnUrl: ipnUrl,
            lang: lang,
            requestType: requestType,
            autoCapture: autoCapture,
            extraData: extraData,
            orderGroupId: orderGroupId,
            signature: signature,
          })
          const options = {
            url: 'https://test-payment.momo.vn/v2/gateway/api/create',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': Buffer.byteLength(requestBody),
            },
            data: requestBody,
          }
          try {
            let result = await axios(options)
            return result.data
          } catch (err) {
            return err
          }
        } else {
          return {
            message: 'Đặt hàng thành công successfully',
          }
        }
      }
      return {
        message: 'Đặt hàng thất bại giỏ hàng không tồn tại',
      }
    } catch (error) {}
  }
  @Public()
  @Post('/payment')
  async checkPaymentMomo (@Body() body) {
    if (body.resultCode == 0) {
      console.log(body.orderId)
      return await this.ordersService.changePayment(body.orderId, true)
    }
  }

  @Patch('/cancelled/:id')
  async cancelOrderChangeStatus (@Admin() req, @Param('id') id: number) {
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
  async completedOrderChangeStatus (@Admin() req, @Param('id') id: number) {
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
  async processingOrderChangeStatus (@Admin() req, @Param('id') id: number) {
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

import { Test, TestingModule } from '@nestjs/testing'
import { OrdersController } from './orders.controller'
import { OrdersService } from './orders.service'
import { CartsService } from '../carts/carts.service'
import { ProductsService } from '../products/products.service'
import { OrderItemsService } from '../order-items/order-items.service'

describe('Kiểm tra đặt hàng', () => {
  let controller: OrdersController
  let mockCartsService: any
  let mockProductsService: any
  let mockOrdersService: any
  let mockOrderItemsService: any

  beforeEach(async () => {
    mockCartsService = {
      findOne: jest.fn().mockResolvedValue({
        id: 1,
        product: 1,
        quantity: 15,
        user: 1,
      }),
      remove: jest.fn().mockResolvedValue(true),
    }

    mockProductsService = {
      findOne: jest.fn().mockResolvedValue({
        id: 1,
        name: 'Test Product',
        price: 100000,
        stock: 10,
        description: 'Test Description',
      }),
      updateStock: jest.fn().mockResolvedValue(true),
    }

    mockOrdersService = {
      create: jest.fn().mockResolvedValue({
        data: {
          id: 1,
        },
      }),
      delete: jest.fn().mockResolvedValue(true),
      findOne: jest.fn().mockResolvedValue({
        id: 1,
        orderId: '123456789',
        total: 150000,
      }),
    }

    mockOrderItemsService = {
      create: jest.fn().mockResolvedValue(true),
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        { provide: OrdersService, useValue: mockOrdersService },
        { provide: CartsService, useValue: mockCartsService },
        { provide: ProductsService, useValue: mockProductsService },
        { provide: OrderItemsService, useValue: mockOrderItemsService },
      ],
    }).compile()
    controller = module.get<OrdersController>(OrdersController)
  })

  it('Nên trả về lỗi khi số lượng đặt hàng vượt quá tồn kho', async () => {
    const result = await controller.create(
      { user: { id: 1 } },
      {
        total: 150000,
        phone: '+84987654321',
        address: '123 Đường ABC, Quận XYZ, Thành phố HCM',
        fullName: 'Nguyễn Văn A',
        idCart: [1],
        payment: false,
      },
    )
    expect(mockCartsService.findOne).toHaveBeenCalledWith(1)
    expect(mockProductsService.findOne).toHaveBeenCalledWith(1)
    expect(result).toBe('Lỗi mặt hàng không đủ hoặc giỏ hàng không tồn tại')
  })

  it('Nên trả về thành công khi đặt hàng hợp lệ', async () => {
    mockProductsService.findOne = jest.fn().mockResolvedValue({
      id: 1,
      name: 'Test Product',
      price: 100000,
      stock: 20,
      description: 'Test Description',
    })

    const result = await controller.create(
      { user: { id: 1 } },
      {
        total: 150000,
        phone: '+84987654321',
        address: '123 Đường ABC, Quận XYZ, Thành phố HCM',
        fullName: 'Nguyễn Văn A',
        idCart: [1],
        payment: false,
      },
    )

    expect(mockCartsService.findOne).toHaveBeenCalledWith(1)
    expect(mockProductsService.findOne).toHaveBeenCalledWith(1)
    expect(mockOrderItemsService.create).toHaveBeenCalled()
    expect(result).toEqual({
      message: 'Đặt hàng thành công successfully',
    })
  })
})

import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common'

export const Admin = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    if (request.user.role === 'admin') {
      return request
    }
    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
  },
)

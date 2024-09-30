import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common'

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    if (request.user.role === 'user') {
      return request
    }
    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
  },
)

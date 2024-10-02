import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common'

export const AllUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    if (request.user.role === 'user' || request.user.role === 'admin' ) {
      return request
    }
    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
  },
)

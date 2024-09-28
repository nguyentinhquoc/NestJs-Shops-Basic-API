import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { AppService } from './app.service'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth/auth.service'
import { JwtAuthGuard } from './auth/jwt-auth.guard'
import { LocalAuthGuard } from './auth/local-auth.guard'
import { Public } from './decorater/NoCheckToken'

@Controller()
export class AppController {
  constructor (
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login (@Request() req) {
    return this.authService.login(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile (@Request() req) {
    return req.user
  }
}

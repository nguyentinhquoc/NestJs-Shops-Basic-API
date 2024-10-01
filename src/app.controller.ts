import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { AppService } from './app.service'
import { AuthService } from './auth/auth.service'
import { LocalAuthGuard } from './auth/local-auth.guard'
import { Public } from './decorater/NoLogin.decorator'
import { log } from 'console'
@Controller()
export class AppController {
  constructor (
    private readonly authService: AuthService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
   login (@Request() req) {
    return this.authService.login(req.user)
  }
  @Get('profile')
  getProfile (@Request() req) {
      return req.user
  }
}

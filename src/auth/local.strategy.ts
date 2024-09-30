import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service'
import { UsersService } from '../users/users.service'
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor (
    private authService: AuthService,
    private usersService: UsersService,
  ) {
    super()
  }
  async validate (user_name: string, password: string): Promise<any> {
    const user = await this.usersService.checkDataLogin(user_name, password)
    if (user) {
      return user
    }
    return null
  }
}

import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor (
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login (user: any) {
    const payload = { user_name: user.user_name, role: user.role, id: user.id }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}

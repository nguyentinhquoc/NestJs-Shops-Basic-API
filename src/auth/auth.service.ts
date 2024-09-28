import { Injectable } from '@nestjs/common'
import { User } from 'src/users/entities/user.entity'
import { Repository } from 'typeorm'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor (
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login (user: any) {
    const payload = { username: user.user_name, id: user.id }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}

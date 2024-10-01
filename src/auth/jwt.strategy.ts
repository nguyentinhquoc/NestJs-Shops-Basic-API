import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor (private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('JWT_SECRET'),
    })
  }
  async validate (payload: any) {
    return await { user_name: payload.user_name, role: payload.role,  id:payload.id }
  }
}

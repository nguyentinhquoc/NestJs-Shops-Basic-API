import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcryptjs'
@Injectable()
export class UsersService {
  constructor (
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async Register (createUserDto: CreateUserDto) {
    try {
      const checkUser = await this.usersRepository.findOne({
        where: [
          { user_name: createUserDto.user_name },
          { email: createUserDto.email },
        ],
      })
      if (!checkUser) {
        var salt = bcrypt.genSaltSync(10)
        var pashHash = bcrypt.hashSync(createUserDto.password, salt)
        const entity = this.usersRepository.create({
          email: createUserDto.email,
          user_name: createUserDto.user_name,
          password: pashHash,
        })
        await this.usersRepository.save(entity)
        return {
          status: 'Success',
          message: 'Đang ký thành công',
        }
      } else {
        return {
          status: 'Error',
          message: 'UserName hoặc Email đã tồn tại trên hệ thống',
        }
      }
    } catch (error) {}
  }
  async checkDataLogin (user_name: string, password: string) {
    const userCheck = await this.usersRepository.findOne({
      where: { user_name },
    })
    if (bcrypt.compareSync(password, userCheck.password)) {
      return userCheck
    }
    return null
  }
  findAll (): Promise<User[]> {
    return this.usersRepository.find()
  }
  findOne (id: number) {
    return `This action returns a #${id} user`
  }
  update (id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }
  remove (id: number) {
    return `This action removes a #${id} user`
  }
}

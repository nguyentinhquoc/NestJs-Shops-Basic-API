import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { Public } from 'src/decorater/NoLogin.decorator'
import { User } from 'src/decorater/User.decorator'
import { Admin } from 'src/decorater/Admin.decorator'
import { log } from 'console'

@Controller('user')
export class UsersController {
  constructor (private readonly usersService: UsersService) {}

  @Public()
  @Post('/register')
  Register (@Body() createUserDto: CreateUserDto) {
    return this.usersService.Register(createUserDto)
  }
  @Get(':id')
  findOne (@Param('id') id: string) {
    return this.usersService.findOne(+id)
  }

  @Patch(':id')
  update (@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto)
  }

  @Delete(':id')
  remove (@Param('id') id: string) {
    return this.usersService.remove(+id)
  }
}

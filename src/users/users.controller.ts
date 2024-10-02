import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { Public } from 'src/decorater/NoLogin.decorator'
import { AllUser } from 'src/decorater/AllUser.decorator'
import { Admin } from 'src/decorater/Admin.decorator'
import { log } from 'console'

@Controller('users')
export class UsersController {
  constructor (private readonly usersService: UsersService) {}

  @Public()
  @Post('/register')
  Register (@Body() createUserDto: CreateUserDto) {
    return this.usersService.Register(createUserDto)
  }
  @Get()
  findAll (@Admin() req, @Query('page') page: number = 1) {
    return this.usersService.findAll(page)
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
  remove (@Admin() req, @Param('id') id: string) {
    return this.usersService.remove(+id)
  }
  @Post('/restore/:id')
  restore (@Admin() req, @Param('id') id: string) {
    return this.usersService.restore(+id)
  }
}

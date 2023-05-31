import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpException, HttpStatus, Query, Request } from '@nestjs/common';

@Controller('users')
// /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/check/:type')
  checkParams(
    @Query('team') team: string,
    @Query('golaverage') golaverage: number,
    @Param('type') type: string,
    @Request() req,
  ) {
    console.log(
      '🚀 ~ file: users.controller.ts:23 ~ UsersController ~ checkParams ~ query:',
      team,
      golaverage,
      type,
    );

    return { params: req.params, query: req.query, body: req.body };
  }

  // /user/
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    if (
      !createUserDto.first_name ||
      !createUserDto.last_name ||
      !createUserDto.email ||
      !createUserDto.password
    ) {
      throw new HttpException(
        'Invalid parameters in BODY',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.usersService.create(createUserDto);
  }

  // /user/
  @Get()
  findAll() {
    const users = this.usersService.findAll();
    return { status: 'success', users };
  }

  // /users/:id
  @Get(':id')
  getUserById(@Param('id') id: string) {
    console.log(
      '🚀 ~ file: users.controller.ts:41 ~ UsersController ~ findOne ~ param:',
      id,
    );

    if (isNaN(parseInt(id))) {
      throw new HttpException('Invalid parameter', HttpStatus.BAD_REQUEST);
    }

    return this.usersService.findOne(parseInt(id));
  }

  // /users/:id
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    console.log(
      '🚀 ~ file: users.controller.ts:52 ~ UsersController ~ update ~ updateUserDto:',
      updateUserDto,
    );
    // req.body
    if (isNaN(parseInt(id))) {
      throw new HttpException('Invalid parameter', HttpStatus.BAD_REQUEST);
    }
    return this.usersService.update(+id, updateUserDto);
  }

  // /users/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    if (isNaN(parseInt(id))) {
      throw new HttpException('Invalid parameter', HttpStatus.BAD_REQUEST);
    }

    return this.usersService.remove(+id);
  }
}

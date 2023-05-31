import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  users: Array<User>;

  constructor() {
    this.users = [];
  }

  create(createUserDto: CreateUserDto) {
    const newUser: User = {
      ...createUserDto,
      id: this.users.length === 0 ? 1 : this.users.length + 1,
      avatar: createUserDto.avatar || '',
    };

    this.users.push(newUser);
    return newUser;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((u) => u.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user: User = this.findOne(id);

    user.first_name = updateUserDto.first_name || user.first_name;
    user.last_name = updateUserDto.last_name || user.last_name;
    user.password = updateUserDto.password || user.password;
    user.email = updateUserDto.email || user.email;
    user.avatar = updateUserDto.avatar || user.avatar;

    return user;
  }

  remove(id: number) {
    const indexDel = this.users.findIndex((u: User) => u.id === id);
    return this.users.splice(indexDel, 1)[0];
  }
}

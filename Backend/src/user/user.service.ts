import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserError } from './exception/user.error';
import { UserRepository } from './user.repositary';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(userDto: UserDto): Promise<void> {
    if ((await this.userRepository.getUser(userDto.uid)) == null) {
      return await this.userRepository.addOrUpdate(userDto);
    } else {
      try {
        throw new UserError('user already exists');
      } catch (e) {
        throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async updateUser(userDto: UserDto, uid: string): Promise<void> {
    if ((await this.userRepository.getUser(uid)) != null) {
      return await this.userRepository.addOrUpdate(userDto);
    } else {
      try {
        throw new UserError('user does not exists');
      } catch (e) {
        throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async getUser(uid: string): Promise<UserDto> {
    return await this.userRepository.getUser(uid);
  }

  async getUsers(): Promise<unknown> {
    return await this.userRepository.getUsers();
  }

  async deleteUser(uid: string): Promise<void> {
    return await this.userRepository.deleteUser(uid);
  }
}

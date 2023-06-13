import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Resource } from 'hal';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  private SALT = 10;
  constructor(private readonly userRepository: UserRepository) {}

  async getByEmail(email: string) {
    const user = await this.userRepository.getByEmail(email);
    if (!user) throw new NotFoundException('User not found!');
    return user;
  }

  private createUserLinks(user: User, isCollection: boolean): Resource {
    delete user.password;
    const userResource = new Resource(user);
    if (isCollection) {
      userResource.link('item', `/api/users/${user.id}`, {
        method: 'GET',
      });
    } else {
      userResource.link('self', `/api/users/${user.id}`, {
        method: 'GET',
      });
      userResource.link('edit', `/api/users/${user.id}`, {
        method: 'PUT',
      });
      userResource.link('delete', `/api/users/${user.id}`, {
        method: 'DELETE',
      });
      userResource.link('collection', '/api/users', {
        method: 'GET',
      });
    }
    return userResource;
  }

  async create(userDTO: CreateUserDTO) {
    try {
      const user = await this.userRepository.getByEmail(userDTO.email);
      if (user) {
        throw new ConflictException(
          'User with the provided email already exists',
        );
      }
      const newUser = await this.userRepository.create({
        ...userDTO,
        password: bcrypt.hashSync(userDTO.password, this.SALT),
      });
      const userResource = this.createUserLinks(newUser, false);
      userResource.link('documentation', '/api/docs', { method: 'GET' });
      return userResource;
    } catch (error) {
      throw new InternalServerErrorException(
        'An internal server error occurred. Please try again later.',
      );
    }
  }

  async getById(id: number) {
    const user = await this.userRepository.getById(id);
    if (!user) throw new NotFoundException('User not found!');
    const userResource = this.createUserLinks(user, false);
    userResource.link('documentation', '/api/docs', { method: 'GET' });
    return userResource;
  }

  async getAll() {
    const users = await this.userRepository.getAll();
    const usersResource = new Resource({
      users: users.map((user) => {
        const userResource = this.createUserLinks(user, true);
        return userResource;
      }),
    });
    usersResource.link('self', `/api/users/`, { method: 'GET' });
    usersResource.link('documentation', '/api/docs', { method: 'GET' });
    return usersResource;
  }

  async edit(id: number, userDTO: CreateUserDTO) {
    const user = await this.userRepository.getById(id);
    if (!user) throw new NotFoundException('User not found!');
    return await this.userRepository.edit(id, userDTO);
  }

  async delete(id: number) {
    const user = await this.userRepository.getById(id);
    if (!user) throw new NotFoundException('User not found!');
    return await this.userRepository.delete(id);
  }
}

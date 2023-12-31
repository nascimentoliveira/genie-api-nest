import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(userDTO: CreateUserDTO) {
    return this.prisma.user.create({
      data: userDTO,
    });
  }

  async getById(id: number) {
    return this.prisma.user.findFirst({
      where: { id },
    });
  }

  async getByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: { email },
    });
  }

  async getAll() {
    return this.prisma.user.findMany();
  }

  async edit(id: number, userDTO: CreateUserDTO) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: userDTO,
    });
  }

  async delete(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}

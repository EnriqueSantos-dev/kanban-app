import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { CreateUserDto, GetProfileOutputDto } from './dtos';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<void> {
    await this.prisma.user.create({
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true
      },
      data: {
        email: data.email,
        password: data.password,
        name: data.name,
        avatarUrl: data.avatarUrl ?? null
      }
    });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async getProfile(id: string): Promise<GetProfileOutputDto> {
    return await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        boards: {
          select: {
            id: true,
            name: true,
            columns: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      }
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class RefreshTokenService {
  constructor(private readonly prisma: PrismaService) {}

  public async saveOrUpdate(data: {
    userId: string;
    token: string;
  }): Promise<void> {
    await this.prisma.refreshToken.upsert({
      where: {
        userId: data.userId
      },
      update: {
        token: data.token
      },
      create: {
        userId: data.userId,
        token: data.token
      }
    });
  }

  public async deleteAllRefreshTokensForUser(userId: string): Promise<void> {
    await this.prisma.refreshToken.deleteMany({
      where: {
        userId
      }
    });
  }
}

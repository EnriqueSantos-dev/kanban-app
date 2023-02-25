import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

import { CookieOptions, Response } from 'express';
import { memoryStorage } from 'multer';

import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';

import {
  GetProfileOutputDTO,
  SignInInputDTO,
  SingUpInputDTO,
  RefreshTokenOutputDTO
} from './dtos';
import { AuthService } from './auth.service';
import { AtJwtAuthGuard, RtJwtAuthGuard } from './guards';
import { GetUserProperties } from './decorators';
import { REFRESH_TOKEN_KEY } from './constants';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService
  ) {}

  @Post('login')
  public async login(@Body() dto: SignInInputDTO, @Res() res: Response) {
    const { accessToken, refreshToken } = await this.authService.login(
      dto.email,
      dto.password
    );

    return res
      .cookie(REFRESH_TOKEN_KEY, refreshToken, this.generateCookieOptions())
      .json({ access_token: accessToken });
  }

  @Post('register')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: memoryStorage()
    })
  )
  public async register(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /image\/(png|jpg|jpeg)/
        })
        .addMaxSizeValidator({
          maxSize: 5 * 1024 * 1024 // 5MB
        })
        .build({
          fileIsRequired: false,
          exceptionFactory() {
            return new BadRequestException(
              'File too large (max 5MB) or invalid file type (png, jpg, jpeg) only'
            );
          }
        })
    )
    avatar: Express.Multer.File,
    @Body() dto: SingUpInputDTO
  ) {
    return await this.authService.save({ ...dto, avatar });
  }

  @UseGuards(AtJwtAuthGuard)
  @Get('profile')
  public async getProfile(
    @GetUserProperties('id') id: string
  ): Promise<GetProfileOutputDTO> {
    return await this.authService.getProfile(id);
  }

  @UseGuards(RtJwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  public async refresh(
    @GetUserProperties() user: { sub: string; email: string },
    @Res() res: Response
  ): Promise<RefreshTokenOutputDTO> {
    const { accessToken, refreshToken } = await this.authService.refreshToken(
      user
    );

    res.cookie(REFRESH_TOKEN_KEY, refreshToken, this.generateCookieOptions());
    return { access_token: accessToken };
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('logout/:userId')
  public async logout(@Param('userId') userId: string, @Res() res: Response) {
    await this.authService.logout(userId);

    res.clearCookie(REFRESH_TOKEN_KEY, {
      ...this.generateCookieOptions(),
      maxAge: 0
    });

    return res.end();
  }

  private generateCookieOptions(): CookieOptions {
    return {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: this.configService.get<number>('MAX_AGE_COOKIE'), // 7 days
      secure: this.configService.get('NODE_ENV') === 'production'
    };
  }
}

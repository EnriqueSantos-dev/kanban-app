import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AtJwtAuthGuard extends AuthGuard('at-jwt') {}

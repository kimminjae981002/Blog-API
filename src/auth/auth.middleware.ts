import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('토큰이 존재하지 않습니다.');
    }

    const token = authHeader.split(' ')[1];

    try {
      this.jwtService.verify(token, { secret: process.env.JWT_SECRET_KEY });
      next();
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}

import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization;

    if (header && header.toString().split(' ')[1]) {
      if (header.toString().split(' ')[0] !== 'Bearer') {
        throw new HttpException(
          {
            message: `Invalid token`,
          },
          HttpStatus.UNAUTHORIZED,
        );
      }

      const token = header.toString().split(' ')[1];

      try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET);

        const user = await this.userService.findByEmail(decoded.email);

        if (!user) {
          throw new HttpException(
            {
              message: `Invalid token`,
            },
            HttpStatus.UNAUTHORIZED,
          );
        }

        req['user'] = { id: user.id, email: user.email, role: user.role };
        next();
      } catch (e) {
        throw new HttpException(
          {
            message: `Internal server error`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } else {
      throw new HttpException(
        {
          message: `Header not included`,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}

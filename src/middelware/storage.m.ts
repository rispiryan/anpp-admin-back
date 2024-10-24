import {
  Inject,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, NextFunction } from 'express';

function DateDiff(date1: Date, date2: Date) {
  const diffInMilliseconds = Math.abs(date1.getTime() - date2.getTime());
  const diffInMinutes = diffInMilliseconds / (1000 * 60);
  return Math.floor(diffInMinutes);
}

@Injectable()
export class StorageMiddleware implements NestMiddleware {
  constructor(
    @Inject('STORAGE') private readonly storageService: Map<string, any>,
  ) {}
  use(req: any, res: Response, next: NextFunction) {
    const token: any = req?.headers?.authorization?.split(' ')[1];
    if (!token || token.length < 10) {
      return next();
    }

    const session = this.storageService.get(token);
    if (!session && token) {
      this.storageService.set(token, new Date());
    }
    if (!session) {
      throw new UnauthorizedException({
        message: 'user is not authorized',
      });
    }
    if (session && token) {
      const dif = DateDiff(new Date(), new Date(session));
      if (dif >= 10) {
        this.storageService.delete(token);
        throw new UnauthorizedException({
          message: 'user is not authorized',
        });
      } else {
        this.storageService.set(token, new Date());
      }
    }

    next();
  }
}

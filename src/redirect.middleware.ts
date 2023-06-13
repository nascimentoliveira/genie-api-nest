import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RedirectMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { originalUrl, method } = req;
    if (
      (originalUrl === '/' ||
        originalUrl === '/api' ||
        originalUrl === '/api/') &&
      method === 'GET'
    ) {
      return res.redirect(HttpStatus.SEE_OTHER, '/api/health');
    }
    next();
  }
}

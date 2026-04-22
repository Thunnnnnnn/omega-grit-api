import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map((data) => ({
        code: response.statusCode,
        status: response.statusCode >= 200 && response.statusCode < 300,
        data: data,
      })),
    );
  }
}

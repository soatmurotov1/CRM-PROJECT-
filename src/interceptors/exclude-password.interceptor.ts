import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs'


@Injectable()
export class ExcludePasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return this.removePassword(data)
      })
    )
  }

  private removePassword(data: any) {
    if (!data) return data

    if (Array.isArray(data)) {
      return data.map((item) => this.removePassword(item));
    }

    if (typeof data === 'object') {
      const { password, ...rest } = data
      return rest
    }

    return data
  }
}

import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { headers } = context.switchToHttp().getRequest();
    const validRequest = validateRequest(headers.authorization || '' , headers.token || '' );

    if (validRequest) {
      return true;
    }
    else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}

const validateRequest = (authorization: string , token:string): boolean => authorization == 'Bearer db668134-ead0-4be8-8065-376981277ebc' || token == 'db668134-ead0-4be8-8065-376981277ebc';
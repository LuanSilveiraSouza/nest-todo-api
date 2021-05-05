import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserRoles } from 'src/user/user.interface';

@Injectable()
export class AdminRoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    return request.user.role == UserRoles.ADMIN;
  }
}

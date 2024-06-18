import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private userSevice: UserService){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const user = await this.userSevice.getUser(request)
      request['user']= user;
    } catch (error) {
      throw new UnauthorizedException()
    }

    return true;
  }
}

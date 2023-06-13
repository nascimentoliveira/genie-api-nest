import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    try {
      const data = await this.authService.checkToken(
        authorization?.replace('Bearer ', ''),
      );
      const user = await this.userService.getById(parseInt(data.sub));
      request.user = user;
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  }
}

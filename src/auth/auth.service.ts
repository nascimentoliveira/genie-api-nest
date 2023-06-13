import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
  private EXPIRATION_TIME = '7 days';
  private ISSUER = 'Genie';
  private AUDIENCE = 'users';

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private async createToken(user: User) {
    return this.jwtService.sign(
      {
        email: user.email,
      },
      {
        expiresIn: this.EXPIRATION_TIME,
        subject: String(user.id),
        issuer: this.ISSUER,
        audience: this.AUDIENCE,
      },
    );
  }

  async checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        audience: this.AUDIENCE,
        issuer: this.ISSUER,
      });
      return data;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async login(loginDTO: LoginDTO) {
    const user = await this.userService.getByEmail(loginDTO.email);
    if (!user) {
      throw new UnauthorizedException('Email or password are incorrect.');
    }
    const validPassword = bcrypt.compareSync(loginDTO.password, user.password);
    delete user.password;
    if (!validPassword) {
      throw new UnauthorizedException('Email or password are incorrect.');
    }
    return {
      user,
      accessToken: await this.createToken(user),
    };
  }
}

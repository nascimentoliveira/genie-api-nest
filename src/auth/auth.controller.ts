import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from './dto/auth-login.dto';
import { AuthService } from './auth.service';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import {
  AuthResponseDTO,
  AuthUnauthorizedResponseDTO,
  AuthUnprocessableEntityResponseDTO,
} from './dto/auth-responses.dto';
import { InternalServerErrorDTO } from 'src/dtos/api-responses.dto';

@ApiTags('Authentication')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'User login.' })
  @ApiOkResponse({
    description: 'User logged in successfully.',
    type: AuthResponseDTO,
  })
  @ApiUnauthorizedResponse({
    description: 'User not registered or invalid password.',
    type: AuthUnauthorizedResponseDTO,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Invalid or incomplete data.',
    type: AuthUnprocessableEntityResponseDTO,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: InternalServerErrorDTO,
  })
  @Post()
  async login(@Body() body: LoginDTO) {
    return this.authService.login(body);
  }
}

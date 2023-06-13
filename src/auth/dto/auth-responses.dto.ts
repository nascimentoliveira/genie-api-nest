import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDTO } from 'src/user/dto/user-responses.dto';

export class AuthResponseDTO {
  @ApiProperty({
    type: UserResponseDTO,
    description: 'User information',
  })
  user: UserResponseDTO;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    description: 'Access token',
  })
  accessToken: string;
}

export class AuthUnauthorizedResponseDTO {
  @ApiProperty({ example: 401 })
  statusCode: number;

  @ApiProperty({
    example: 'Email or password are incorrect.',
  })
  message: string;

  @ApiProperty({ example: 'Unauthorized' })
  error: string;
}

export class AuthUnprocessableEntityResponseDTO {
  @ApiProperty({ example: 422 })
  statusCode: number;

  @ApiProperty({
    type: [String],
    example: ['email must be an email', 'password is not strong enough'],
  })
  message: string[];

  @ApiProperty({ example: 'Unprocessable Entity' })
  error: string;
}

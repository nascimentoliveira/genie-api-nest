import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDTO {
  @ApiProperty({ example: 0 })
  id: number;

  @ApiProperty({ example: 'jonh.doe@email.com' })
  email: string;

  @ApiProperty({ example: 'Jonh' })
  name: string;

  @ApiProperty({
    type: String,
    format: 'date-time',
    example: '2023-06-11T14:21:50.640Z',
  })
  createdAt: string;

  @ApiProperty({
    type: String,
    format: 'date-time',
    example: '2023-06-11T14:21:50.640Z',
  })
  updatedAt: string;
}

export class UserConflitResponseDTO {
  @ApiProperty({ example: 409 })
  statusCode: number;

  @ApiProperty({
    example: 'User with the provided email already exists!',
  })
  message: string;

  @ApiProperty({ example: 'Conflict' })
  error: string;
}

export class UserUnprocessableEntityResponseDTO {
  @ApiProperty({ example: 422 })
  statusCode: number;

  @ApiProperty({
    type: [String],
    example: [
      'email must be an email',
      'password is not strong enough',
      'name should not be empty',
    ],
  })
  message: string[];

  @ApiProperty({ example: 'Unprocessable Entity' })
  error: string;
}

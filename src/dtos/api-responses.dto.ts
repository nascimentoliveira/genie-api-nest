import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedResponseDTO {
  @ApiProperty({ example: 401 })
  statusCode: number;

  @ApiProperty({
    example: `Unexpected header format! Field 'Authorization' not found.`,
  })
  message: string;

  @ApiProperty({ example: 'Unauthorized' })
  error: string;
}

export class ForbiddenResponseDTO {
  @ApiProperty({ example: 403 })
  statusCode: number;

  @ApiProperty({
    example: 'Invalid or expired token. Please log into your account again!',
  })
  message: string;

  @ApiProperty({ example: 'Forbidden' })
  error: string;
}

export class InternalServerErrorDTO {
  @ApiProperty({ example: 500 })
  statusCode: number;

  @ApiProperty({
    example: 'An internal server error occurred. Please try again later.',
  })
  message: string;

  @ApiProperty({ example: 'Internal Server Error' })
  error: string;
}

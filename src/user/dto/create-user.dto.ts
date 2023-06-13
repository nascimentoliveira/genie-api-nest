import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class CreateUserDTO {
  @IsEmail()
  @ApiProperty({ example: 'jonh.doe@email.com' })
  email: string;

  @IsStrongPassword()
  @ApiProperty({ example: '123paS$word*/' })
  password: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Jonh' })
  name: string;
}

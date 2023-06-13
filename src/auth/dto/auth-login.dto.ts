import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDTO {
  @IsEmail()
  @ApiProperty({ example: 'jonh.doe@email.com' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ example: '123paS$word*/' })
  password: string;
}

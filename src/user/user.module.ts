import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule)],
  providers: [UserService, UserRepository],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}

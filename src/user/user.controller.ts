import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import {
  UserConflitResponseDTO,
  UserResponseDTO,
  UserUnprocessableEntityResponseDTO,
} from './dto/user-responses.dto';
import {
  ForbiddenResponseDTO,
  InternalServerErrorDTO,
  UnauthorizedResponseDTO,
} from 'src/dtos/api-responses.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('users')
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Register a new user.' })
  @ApiCreatedResponse({
    description: 'User successfully registered.',
    type: UserResponseDTO,
  })
  @ApiConflictResponse({
    description: 'Invalid data for user registration.',
    type: UserConflitResponseDTO,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Invalid or incomplete data.',
    type: UserUnprocessableEntityResponseDTO,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: InternalServerErrorDTO,
  })
  @Post()
  createUser(@Body() body: CreateUserDTO) {
    return this.userService.create(body);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get()
  getAllUsers() {
    return this.userService.getAll();
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a specific user.' })
  @ApiOkResponse({
    description: 'User returned successfully.',
    type: UserResponseDTO,
  })
  @ApiUnauthorizedResponse({
    description: 'Missing access token.',
    type: UnauthorizedResponseDTO,
  })
  @ApiForbiddenResponse({
    description: 'Operation not allowed.',
    type: ForbiddenResponseDTO,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: InternalServerErrorDTO,
  })
  @Get(':id')
  @ApiParam({ name: 'id', description: 'The user ID that will be displayed.' })
  getUser(@Param('id') id: string) {
    return this.userService.getById(parseInt(id));
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Edit an existing user.' })
  @ApiOkResponse({
    description: 'User successfully edited.',
    type: UserResponseDTO,
  })
  @ApiUnauthorizedResponse({
    description: 'Missing access token.',
    type: UnauthorizedResponseDTO,
  })
  @ApiForbiddenResponse({
    description: 'Operation not allowed.',
    type: ForbiddenResponseDTO,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: InternalServerErrorDTO,
  })
  @Put(':id')
  @ApiParam({ name: 'id', description: 'The user ID that will be edited.' })
  editUser(@Body() body: CreateUserDTO, @Param('id') id: string) {
    return this.userService.edit(parseInt(id), body);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an existing user' })
  @ApiOkResponse({
    description: 'User successfully deleted.',
    type: UserResponseDTO,
  })
  @ApiUnauthorizedResponse({
    description: 'Missing access token.',
    type: UnauthorizedResponseDTO,
  })
  @ApiForbiddenResponse({
    description: 'Operation not allowed.',
    type: ForbiddenResponseDTO,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: InternalServerErrorDTO,
  })
  @Delete(':id')
  @ApiParam({ name: 'id', description: 'The ID of the user to be deleted.' })
  deleteUser(@Param('id') id: string) {
    return this.userService.delete(parseInt(id));
  }
}

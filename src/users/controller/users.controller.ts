import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserDto } from '../dtos';
import { UsersService, AuthService } from '../services';
import { Serialize } from '../../interceptors';
import { CurrentUser } from '../../decorators';
import { User } from '../entities';
import { AuthGuard } from '../../guards';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  @Get('/whoami')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ description: 'Received current user' })
  @ApiForbiddenResponse({ description: 'No currently signed in user' })
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signout')
  @ApiCreatedResponse({ description: 'User is signed out' })
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Post('/signin')
  @ApiBadRequestResponse({ description: 'Invalid password' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiCreatedResponse({ description: 'User is signed in' })
  async signin(
    @Body() { email, password }: CreateUserDto,
    @Session() session: any
  ) {
    const user = await this.authService.signin(email, password);
    session.userId = user.id;
    return user;
  }

  @Post('/signup')
  @ApiBadRequestResponse({ description: 'Email is already in use' })
  @ApiCreatedResponse({ description: 'User is registred' })
  async createUser(
    @Body() { email, password }: CreateUserDto,
    @Session() session: any
  ) {
    const user = await this.authService.signup(email, password);
    session.userId = user.id;
    return user;
  }

  @Get('/:id')
  @ApiNotFoundResponse({ description: 'No user is signed in' })
  @ApiBadRequestResponse({ description: 'No user with given ID' })
  findUser(@Param('id') id: string) {
    return this.usersService.findOne(parseInt(id));
  }

  @Get()
  @ApiOkResponse({ description: 'Found all users with given email' })
  @ApiNotFoundResponse({ description: 'No users with given email' })
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Delete('/:id')
  @ApiOkResponse({ description: 'Removed user with given ID ' })
  @ApiNotFoundResponse({ description: 'No user with given ID' })
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch('/:id')
  @ApiCreatedResponse({ description: 'Updated user with given ID' })
  @ApiNotFoundResponse({ description: 'No user with given ID' })
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }
}

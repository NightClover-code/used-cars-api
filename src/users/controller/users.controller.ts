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
import {
  BadRequestResponse,
  CreatedResponse,
  ForbiddenResponse,
  NotFoundReponse,
  OkResponse,
} from 'src/utils';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  @Get('/whoami')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ description: OkResponse.WHOAMI })
  @ApiForbiddenResponse({ description: ForbiddenResponse.WHOAMI })
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signout')
  @ApiCreatedResponse({ description: CreatedResponse.SIGNOUT })
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Post('/signin')
  @ApiBadRequestResponse({ description: BadRequestResponse.SIGNIN })
  @ApiNotFoundResponse({ description: NotFoundReponse.SIGNIN })
  @ApiCreatedResponse({ description: CreatedResponse.SIGNIN })
  async signin(
    @Body() { email, password }: CreateUserDto,
    @Session() session: any
  ) {
    const user = await this.authService.signin(email, password);
    session.userId = user.id;
    return user;
  }

  @Post('/signup')
  @ApiBadRequestResponse({ description: BadRequestResponse.SIGNUP })
  @ApiCreatedResponse({ description: CreatedResponse.SIGNUP })
  async createUser(
    @Body() { email, password }: CreateUserDto,
    @Session() session: any
  ) {
    const user = await this.authService.signup(email, password);
    session.userId = user.id;
    return user;
  }

  @Get('/:id')
  @ApiCreatedResponse({ description: NotFoundReponse.FIND_USER })
  @ApiNotFoundResponse({ description: NotFoundReponse.FIND_USER })
  @ApiBadRequestResponse({ description: NotFoundReponse.FIND_USER })
  findUser(@Param('id') id: string) {
    return this.usersService.findOne(parseInt(id));
  }

  @Get()
  @ApiOkResponse({ description: OkResponse.FIND_ALL_USERS })
  @ApiNotFoundResponse({ description: NotFoundReponse.FIND_ALL_USERS })
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Delete('/:id')
  @ApiOkResponse({ description: OkResponse.REMOVE_USER })
  @ApiNotFoundResponse({ description: NotFoundReponse.REMOVE_USER })
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch('/:id')
  @ApiOkResponse({ description: OkResponse.UPDATE_USER })
  @ApiNotFoundResponse({ description: NotFoundReponse.UPDATE_USER })
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }
}

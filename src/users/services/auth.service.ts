import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '.';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    const users = await this.usersService.find(email);

    if (users.length) throw new BadRequestException('email is already in use');

    const salt = randomBytes(8).toString('hex');
    const separator = '.';
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const encryptedPassword = salt + separator + hash.toString('hex');

    const user = await this.usersService.create(email, encryptedPassword);

    return user;
  }

  signin() {}
}

import { Test } from '@nestjs/testing';
import { User } from '../../../users/entities';
import { AuthService, UsersService } from '..';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    const users: User[] = [];

    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter(user => user.email === email);

        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 99999),
          email,
          password,
        } as User;
        users.push(user);

        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup('ello@gmail.com', 'padnc');

    expect(user.password).not.toEqual('padnc');

    const [salt, hash] = user.password.split('.');

    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signup with email already in use', async () => {
    await service.signup('ello@gmail.com', 'padnc');

    expect.assertions(2);

    try {
      await service.signup('ello@gmail.com', 'padnc');
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequestException);
      expect(err.message).toBe('email is already in use');
    }
  });

  it('throw error if signin is called with unused email', async () => {
    expect.assertions(2);

    try {
      await service.signin('ello@gmail.com', 'padnc');
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
      expect(err.message).toBe('user not found');
    }
  });

  it('throws error if invalid password', async () => {
    await service.signup('ello@gmail.com', 'padnc');

    expect.assertions(2);

    try {
      await service.signin('ello@gmail.com', 'pa5dnc');
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequestException);
      expect(err.message).toBe('Invalid password');
    }
  });

  it('returns user if correct user is provided', async () => {
    await service.signup('aisucb@gmail.com', 'zldvn');

    const user = await service.signin('aisucb@gmail.com', 'zldvn');

    expect(user).toBeDefined();
  });
});

import { Test } from '@nestjs/testing';
import { User } from 'src/users/entities';
import { AuthService } from '..';
import { UsersService } from '..';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    fakeUsersService = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
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
    fakeUsersService.find = () =>
      Promise.resolve([
        { id: 1, email: 'acba@gmail.com', password: 'zvbai' } as User,
      ]);

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
    fakeUsersService.find = () =>
      Promise.resolve([
        { email: 'aisucb@gmail.com', password: 'zldvn' } as User,
      ]);

    expect.assertions(2);

    try {
      await service.signin('aisucb@gmail.com', 'zldvn');
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequestException);
      expect(err.message).toBe('Invalid password');
    }
  });

  it('returns user if correct user is provided', async () => {
    fakeUsersService.find = () =>
      Promise.resolve([
        { email: 'aisucb@gmail.com', password: 'zldvn' } as User,
      ]);

    const user = await service.signin('aauob@gmail.com', 'zldvn');

    expect(user).toBeDefined();
  });
});

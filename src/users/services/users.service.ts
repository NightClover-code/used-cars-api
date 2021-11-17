import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });

    return this.repo.save(user);
  }

  async findOne(id: number) {
    if (!id) throw new BadRequestException('no user is signed in');

    const user = await this.repo.findOne(id);

    if (!user) throw new NotFoundException('user not found');

    return user;
  }

  async find(email: string) {
    const users = await this.repo.find({ email });

    if (!users.length)
      throw new NotFoundException('No users with given email found');

    return users;
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);

    if (!user) throw new NotFoundException('user not found');
    Object.assign(user, attrs);

    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) throw new NotFoundException('user not found');

    return this.repo.remove(user);
  }
}

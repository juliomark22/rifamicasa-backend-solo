import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../infrastructure/users.repository';
import { User } from '../domain/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async createUser(email: string, password: string, role: 'admin' | 'afiliado' | 'cliente'): Promise<User> {
    return this.usersRepo.create(email, password, role);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepo.findByEmail(email);
  }
}

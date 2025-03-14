import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-users.dto';
import { UserRepository } from './users.repository';
import { UpdateUserDTO } from './dto/update-user.dto';
import { QueryUSerDTO } from './dto/query-users.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(user: CreateUserDTO) {
    return await this.userRepository.createEntity(user);
  }

  async getQuery(query: QueryUSerDTO) {
    return await this.userRepository.getAll(query);
  }

  async getAll() {
    return await this.userRepository.findAll();
  }

  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }

  async findById(id: number) {
    return await this.userRepository.findById(id);
  }

  async update(id: number, userDTO: UpdateUserDTO) {
    await this.findById(id);
    return this.userRepository.updateEntity(id, userDTO);
  }

  async findExchange(id: number) {
    return await this.userRepository.getExchange(id);
  }

  async remove(id: number) {
    return this.userRepository.destroy(id);
  }
}

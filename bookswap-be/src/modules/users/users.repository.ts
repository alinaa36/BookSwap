import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dto/create-users.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { QueryUSerDTO } from './dto/query-users.dto';

export class UserRepository extends Repository<Users> {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {
    super(
      userRepository.target,
      userRepository.manager,
      userRepository.queryRunner,
    );
  }

  public async getAll(query: QueryUSerDTO) {
    const whereOptions = Object.assign(
      {},
      query.name && { name: query.name },
      query.lastname && { lastname: query.lastname },
    );
    return await this.find({ where: whereOptions });
  }

  public async store(user: CreateUserDTO) {
    const newUser = await this.create(user);
    return this.save(newUser);
  }

  public async updateUser(id: number, userDTO: UpdateUserDTO) {
    const updateUser = await this.findOne({ where: { id } });
    if (!updateUser) return undefined;
    Object.assign(updateUser, userDTO);
    return this.save(updateUser);
  }

  public async findByEmail(email: string) {
    return await this.findOne({ where: { email } });
  }

  public async findById(id: number) {
    return await this.findOne({ where: { id } });
  }
}

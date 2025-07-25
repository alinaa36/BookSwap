import { Repository } from 'typeorm';
import { User } from './entity/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryUSerDTO } from './dto/query-users.dto';
import { BaseRepository } from '../../modules/common/repository';

export class UserRepository extends BaseRepository<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  public async getAll(query: QueryUSerDTO) {
    const whereOptions = Object.assign(
      {},
      query.name && { name: query.name },
      query.lastname && { lastname: query.lastname },
    );
    return await this.find({ where: whereOptions });
  }

  public async getExchange(id: number) {
    const user = await this.findOne({
      where: { id },
      relations: ['receivedExchanges'],
    });
    return user.receivedExchanges;
  }

  public async findByEmail(email: string) {
    return await this.findOne({ where: { email } });
  }
}

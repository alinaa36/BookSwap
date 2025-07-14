import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';

export class BaseRepository<T extends { id: number }> extends Repository<T> {
  constructor(private entityRepository: Repository<T>) {
    super(
      entityRepository.target,
      entityRepository.manager,
      entityRepository.queryRunner,
    );
  }

  public async findAll(): Promise<T[]> {
    return await this.find();
  }

  public async findById(id: number): Promise<T | null> {
    return await this.findOne({ where: { id } as FindOptionsWhere<T> });
  }

  public async createEntity(data: DeepPartial<T>): Promise<T> {
    const newEntity = this.create(data);
    return this.save(newEntity);
  }

  public async updateEntity(
    id: number,
    data: DeepPartial<T>,
  ): Promise<T | undefined> {
    const entity = await this.findOne({ where: { id } as FindOptionsWhere<T> });
    if (!entity) return undefined;
    Object.assign(entity, data);
    return await this.save(entity);
  }

  public async destroy(id: number) {
    return this.delete(id);
  }
}

import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    return await this.repository.findOneOrFail({
      where: { id: user_id },
      relations: ['games']
    });
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query("Select * from users order by first_name ASC");
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return this.repository.query(`
      Select 
        * 
      FROM 
        users 
      WHERE 
        first_name ILIKE '${first_name}' 
        AND last_name ILIKE '${last_name}'
    `);
  }
}

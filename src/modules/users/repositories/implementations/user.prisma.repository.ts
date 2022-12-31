import { User } from '../../entities/user.entity'
import { IUserRepository } from '../user.respository'

export class UserPrismaRepository implements IUserRepository {
  async findByUsername(username: string): Promise<User | undefined> {
    throw new Error('Method not implemented.')
  }
  async save(user: User): Promise<User> {
    throw new Error('Method not implemented.')
  }
}

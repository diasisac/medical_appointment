import { User } from '../entities/user.entity'

export interface IUserRepository {
  findByUsername(username: string): Promise<User | undefined>
  save(user: User): Promise<User>
  findById(id: string): Promise<User | undefined>
}

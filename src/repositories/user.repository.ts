import { User } from '../entities/user.entity'

export class UserRepository {
  users: User[] = []
  async findByUsername(username: string) {
    return this.users.find((user) => user.username === username)
  }

  async save(user: User) {
    this.users.push(user)
    return user
  }
}

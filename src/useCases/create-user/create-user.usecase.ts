import { User } from '../../entities/user.entity'
import { UserRepository } from '../../repositories/user.repository'

type UserRequest = {
  name: string
  username: string
  password: string
}

export class CreateUserUseCase {
  async execute(data: UserRequest) {
    const userRepository = new UserRepository()
    const user = User.create(data)

    if (!data.username || !data.password) {
      throw new Error('Username and password are required')
    }

    const userAlreadyExists = await userRepository.findByUsername(data.username)

    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    const userCreate = await userRepository.save(user)
    return userCreate
  }
}

import { User } from '../../entities/user.entity'
import { ParameterRequiredError } from '../../errors/parameter-required-error'
import { UserRepository } from '../../repositories/user.repository'

type UserRequest = {
  name: string
  username: string
  password: string
}

export class CreateUserUseCase {
  async execute(data: UserRequest) {
    const userRepository = UserRepository.getInstance()
    const user = User.create(data)

    if (!data.username || !data.password) {
      throw new ParameterRequiredError(
        'Username and password are required',
        422,
      )
    }

    const userAlreadyExists = await userRepository.findByUsername(data.username)

    if (userAlreadyExists) {
      throw new ParameterRequiredError('User already exists', 403)
    }

    const userCreate = await userRepository.save(user)
    return userCreate
  }
}

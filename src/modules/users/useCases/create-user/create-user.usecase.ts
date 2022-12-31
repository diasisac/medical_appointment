import { ParameterRequiredError } from '../../../../errors/parameter-required-error'
import { User } from '../../entities/user.entity'
import { IUserRepository } from '../../repositories/user.respository'

type UserRequest = {
  name: string
  username: string
  password: string
}

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: UserRequest) {
    const user = User.create(data)

    if (!data.username || !data.password) {
      throw new ParameterRequiredError(
        'Username and password are required',
        422,
      )
    }

    const userAlreadyExists = await this.userRepository.findByUsername(
      data.username,
    )

    if (userAlreadyExists) {
      throw new ParameterRequiredError('User already exists', 403)
    }

    const userCreate = await this.userRepository.save(user)
    return userCreate
  }
}

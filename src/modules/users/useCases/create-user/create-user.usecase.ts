import { CustomError } from '../../../../errors/custom.error'
import { ParameterRequiredError } from '../../../../errors/parameter-required-error'
import { IPasswordCrypto } from '../../../../infra/shared/crypto/password.crypto'
import { User } from '../../entities/user.entity'
import { IUserRepository } from '../../repositories/user.respository'

type UserRequest = {
  name: string
  username: string
  password: string
}

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordCrypto: IPasswordCrypto,
  ) {}

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
      throw new CustomError('User already exists', 400)
    }
    const passwordHashed = await this.passwordCrypto.hash(data.password)
    user.password = passwordHashed
    const userCreate = await this.userRepository.save(user)
    return userCreate
  }
}

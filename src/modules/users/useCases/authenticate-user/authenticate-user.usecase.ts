import { CustomError } from '../../../../errors/custom.error'
import { IPasswordCrypto } from '../../../../infra/shared/crypto/password.crypto'
import { IUserRepository } from '../../repositories/user.respository'

type AuthenticateRequest = {
  username: string
  password: string
}

export class AuthenticateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordCrypto: IPasswordCrypto,
  ) {}

  async execute({ username, password }: AuthenticateRequest) {
    if (!username || !password) {
      throw new CustomError('Incorrect username or password', 401)
    }

    const user = await this.userRepository.findByUsername(username)

    if (!user) {
      throw new CustomError('Incorrect username or password', 401)
    }

    const passwordMatch = await this.passwordCrypto.compare(
      password,
      user.password,
    )

    if (!passwordMatch) {
      throw new CustomError('Incorrect username or password', 401)
    }

    return user
  }
}

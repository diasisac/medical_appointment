import { Request, Response } from 'express'
import { AuthenticateUserUseCase } from './authenticate-user.usecase'
import { UserPrismaRepository } from '../../repositories/implementations/user.prisma.repository'
import { PasswordBcrypt } from '../../../../infra/shared/crypto/password.bcrypt'
import { JwtToken } from '../../../../infra/shared/token/jwt.token'

export class AuthenticateUserController {
  constructor(
    private userRepository: UserPrismaRepository,
    private passwordBCrypt: PasswordBcrypt,
    private jwtToken: JwtToken,
  ) {}

  async handle(request: Request, response: Response) {
    try {
      const data = request.body
      const authenticateUserUseCase = new AuthenticateUserUseCase(
        this.userRepository,
        this.passwordBCrypt,
        this.jwtToken,
      )
      const user = await authenticateUserUseCase.execute(data)
      return response.status(200).json(user)
    } catch (err: any) {
      return response.status(err.statusCode || 500).json({
        error: err.message || 'Unexpected error.',
      })
    }
  }
}

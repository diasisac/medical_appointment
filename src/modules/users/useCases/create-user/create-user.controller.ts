import { Request, Response } from 'express'
import { IUserRepository } from '../../repositories/user.respository'
import { logger } from '../../../../utils/logger'
import { CreateUserUseCase } from './create-user.usecase'
import { IPasswordCrypto } from '../../../../infra/shared/crypto/password.crypto'

export class CreateUserController {
  constructor(
    private userRepository: IUserRepository,
    private passwordCrypto: IPasswordCrypto,
  ) {}

  async handle(request: Request, response: Response) {
    try {
      logger.info('Usuário sendo criado!')
      const data = request.body

      const createUser = new CreateUserUseCase(
        this.userRepository,
        this.passwordCrypto,
      )

      const user = await createUser.execute(data)
      return response.status(201).json(user)
    } catch (error: any) {
      logger.error(error.stack)
      return response.status(error.statusCode).json({ error: error.message })
    }
  }
}

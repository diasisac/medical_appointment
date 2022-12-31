import { Request, Response } from 'express'
import { IUserRepository } from '../../repositories/user.respository'
import { logger } from '../../../../utils/logger'
import { CreateUserUseCase } from './create-user.usecase'

export class CreateUserController {
  constructor(private userRepository: IUserRepository) {}

  async handle(request: Request, response: Response) {
    try {
      logger.info('Usuário sendo criado!')
      const data = request.body

      const createUser = new CreateUserUseCase(this.userRepository)

      const user = await createUser.execute(data)
      return response.status(201).json(user)
    } catch (error: any) {
      logger.error(error.stack)
      return response.status(error.statusCode).json({ error: error.message })
    }
  }
}

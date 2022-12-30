import { Request, Response } from 'express'
import { logger } from '../../utils/logger'
import { CreateUserUseCase } from './create-user.usecase'

export class CreateUserController {
  async handle(request: Request, response: Response) {
    try {
      logger.info('Usuário sendo criado!')
      const data = request.body

      const createUser = new CreateUserUseCase()

      const user = await createUser.execute(data)
      return response.status(201).json(user)
    } catch (error: any) {
      logger.error(error.stack)
      return response.status(400).json({ error: error.message })
    }
  }
}

import { Router } from 'express'
import { createUserController } from '../modules/users/useCases/create-user'
import { authenticateUserController } from '../modules/users/useCases/authenticate-user'

const userRouter = Router()

userRouter.post('/login', async (request, response) => {
  return await authenticateUserController.handle(request, response)
})

userRouter.post('/users', async (request, response) => {
  return await createUserController.handle(request, response)
})

export { userRouter }

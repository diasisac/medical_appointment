import { Router } from 'express'
import { createSpecialityController } from '../modules/speciality/useCases/create-speciality'
import { ensureAuthenticatedMiddleware } from '../infra/shared/http/ensure-authenticated.middleware'

const specialityRouter = Router()

specialityRouter.post(
  '/specialities',
  ensureAuthenticatedMiddleware,
  async (request, response) => {
    return await createSpecialityController.handle(request, response)
  },
)

export { specialityRouter }

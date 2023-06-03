import { Router } from 'express'
import { createSpecialityController } from '../modules/speciality/useCases/create-speciality'
import { ensureAuthenticatedMiddleware } from '../infra/shared/http/ensure-authenticated.middleware'
import { ensureAdmin } from '../infra/shared/http/ensure-admin.middleware'

const specialityRouter = Router()

specialityRouter.post(
  '/specialities',
  ensureAuthenticatedMiddleware,
  ensureAdmin,
  async (request, response) => {
    return await createSpecialityController.handle(request, response)
  },
)

export { specialityRouter }

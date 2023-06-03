import { Response, Request, NextFunction } from 'express'
import { UserPrismaRepository } from '../../../modules/users/repositories/implementations/user.prisma.repository'
export const ensureAdmin = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const userRepository = new UserPrismaRepository()

  const { userId } = request

  const user = await userRepository.findById(userId)

  if (!user) {
    return response.status(401).json({
      error: 'User not exists!',
    })
  }

  if (!user.isAdmin) {
    return response.status(401).json({
      error: 'User is not admin!',
    })
  }

  return next()
}

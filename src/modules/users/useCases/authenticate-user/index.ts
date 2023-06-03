import { PasswordBcrypt } from '../../../../infra/shared/crypto/password.bcrypt'
import { UserPrismaRepository } from '../../repositories/implementations/user.prisma.repository'
import { AuthenticateUserController } from './authenticate-user.controller'
import { JwtToken } from '../../../../infra/shared/token/jwt.token'

const userPrismaRepository = new UserPrismaRepository()
const passwordBcrypt = new PasswordBcrypt()
const jwtToken = new JwtToken()
const authenticateUserController = new AuthenticateUserController(
  userPrismaRepository,
  passwordBcrypt,
  jwtToken,
)

export { authenticateUserController }

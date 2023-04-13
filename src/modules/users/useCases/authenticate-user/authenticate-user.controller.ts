import { Request, Response } from 'express';
import { AuthenticateUserUseCase } from './authenticate-user.usecase';
import { UserPrismaRepository } from '../../repositories/implementations/user.prisma.repository';
import { PasswordBcrypt } from '../../../../infra/shared/crypto/password.bcrypt';

export class AuthenticateUserController {
  constructor(private userRepository: UserPrismaRepository, private passwordBCrypt: PasswordBcrypt) { }

  async handle(request: Request, response: Response) {
    try {
      const data = request.body;
      const authenticateUserUseCase = new AuthenticateUserUseCase(this.userRepository, this.passwordBCrypt);
      await authenticateUserUseCase.execute(data);
      return response.status(200).json({ message: 'User authenticated successfully.' });
    } catch (err: any) {
      return response.status(err.statusCode || 500).json({
        error: err.message || 'Unexpected error.',
      });
    }
  }
}

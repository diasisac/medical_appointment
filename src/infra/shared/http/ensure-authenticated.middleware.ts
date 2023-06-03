import { NextFunction, Request, Response } from 'express'
import { JwtToken } from '../token/jwt.token'
export const ensureAuthenticatedMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const headerAuth = request.headers.authorization

  if (!headerAuth) {
    return response.status(401).json({
      error: 'token is missing!',
    })
  }

  const [, token] = headerAuth.split(' ')

  if (!token) {
    return response.status(401).json({
      error: 'token is missing!',
    })
  }

  const verifyToken = new JwtToken().validate(token)

  if (!verifyToken) {
    return response.status(401).json({
      error: 'Token invalid!',
    })
  }

  return next()
}

import { Request, Response } from 'express'
import { ISpecialityRepository } from '../../repositories/speciality.repository'
import { CreateSpeciality } from './create-speciality.usecase'
export class CreateSpecialityController {
  constructor(private specialityRepository: ISpecialityRepository) {}

  async handle(request: Request, response: Response) {
    try {
      const speciality = new CreateSpeciality(this.specialityRepository)

      const specialityCreated = await speciality.execute(request.body)

      return response.json(specialityCreated)
    } catch (err: any) {
      return response.status(err.statusCode || 400).json({ error: err.message })
    }
  }
}

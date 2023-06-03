import { CustomError } from '../../../../errors/custom.error'
import { Speciality } from '../../entities/speciality.entity'
import { ISpecialityRepository } from '../../repositories/speciality.repository'

type SpecialityRequest = {
  name: string
  description: string
}

export class CreateSpeciality {
  constructor(private specialityRepository: ISpecialityRepository) {}

  async execute(data: SpecialityRequest) {
    const speciality = new Speciality(data)

    const existsSpeciality = await this.specialityRepository.findByName(
      speciality.name,
    )

    if (existsSpeciality) {
      throw new CustomError('Speciality already exists')
    }

    const specialityCreated = await this.specialityRepository.save(speciality)

    return specialityCreated
  }
}

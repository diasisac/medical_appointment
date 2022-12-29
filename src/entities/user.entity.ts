import { randomUUID } from 'crypto'

type IUser = {
  name: string
  username: string
  password: string
}

export class User {
  id: string
  name: string
  username: string
  password: string
  isAdmin: boolean

  private constructor({ name, username, password }: IUser) {
    this.id = randomUUID()
    this.name = name
    this.username = username
    this.password = password
    this.isAdmin = false
  }

  static create(props: IUser) {
    return new User(props)
  }
}

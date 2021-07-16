import { query } from 'express-validator'
import { usersRepository } from '../models/index.js'
import { generateToken } from '../helpers/token.js'

export default class userService {
  constructor() { }

  static async create(obj) {
    const user = usersRepository(obj)
    await user.save()
    return user
  }

  static async getById(id) {
    return usersRepository.findById(id)
  }

  static async get(filter) {
    let { name, ...rest } = filter
    let query = usersRepository

    if (name) {
      query = query.find({
        name: { $regex: name, $options: 'i' }
      })
    }
    query = query.find(rest)
    return query
  }

  static async update(filter, update) {
    return usersRepository.findOneAndUpdate(filter, update, { new: true })
  }

  static async delete(filter) {
    return usersRepository.findOneAndUpdate(filter, { active: false })
  }

  static async signin({ email, password }) {
    let user = await usersRepository.verifyUser(email, password)
    if (user) {
      return generateToken(user)
    } else {
      throw new Error('email ou senha inválidos')
    }
  }

  static async verifyIfUserExist(cpf) {
    let user = await usersRepository.findOne({ cpf })
    return user ? true : false
  }
}

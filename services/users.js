import { query } from 'express-validator'
import { usersRepository } from '../models/index.js'
import { generateToken } from '../helpers/token.js'
import service from './service.js'

export default class userService extends service {
  constructor() { super(usersRepository) }

  async get(filter) {
    let { name, ...rest } = filter
    let query = usersRepository.find().populate('posts')

    if (name) {
      query = query.find({
        name: { $regex: name, $options: 'i' }
      })
    }
    query = query.find(rest)
    return query
  }

  async signin({ email, password }) {
    let user = await this.repository.verifyUser(email, password)
    if (user) {
      return generateToken(user)
    } else {
      throw new Error('email ou senha inválidos')
    }
  }

  async verifyIfUserIsActive(cpf) {
    let user = await this.repository.findOne({ cpf, active: true })
    return user ? true : false
  }

  async addPost(userId, postId) {
    await this.repository.findOneAndUpdate(
      { _id: userId },
      { $push: { posts: postId } }
    )
  }
}

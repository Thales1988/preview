import service from './service.js'
import userService from './users.js'
import { postsRepository } from '../models/index.js'

let serviceUser = new userService()

export default class postService extends service {
  constructor() { super(postsRepository) }

  async create(obj) {
    let model = this.repository(obj)
    await model.save()
    await serviceUser.addPost(model.user, model._id)
    return model
  }

  async get(filter) {
    return this.repository.find(filter).populate('user')
  }
}

import { generateToken } from '../helpers/token.js'

export default class service {
  constructor(repository) { this.repository = repository }

  async create(obj) {
    const model = this.repository(obj)
    await model.save()
    return model
  }

  async getById(id) {
    return this.repository.findById(id)
  }

  async get(filter) {
    return this.repository.find(filter)
  }

  async update(filter, update) {
    return this.repository.findOneAndUpdate(filter, update, { new: true })
  }

  async delete(filter) {
    return this.repository.findOneAndUpdate(filter, { active: false })
  }
}

import express from 'express'

import { userService } from '../services/index.js'
import { validationCreateUser } from '../validations/users.js'
import validator from '../middleware/validate.js'
import auth from '../middleware/auth.js'
//import { body, param, validationResult } from 'express-validator'

let service = new userService()

const router = express.Router()

const prefix = 'user'

router.get('/health', (req, res) => {
  res.status(200).json({ message: 'API funcionando' })
})

router.post('/', validationCreateUser, validator,
  async (req, res) => {
    let { body } = req

    let user = await service.create(body)

    res.status(201).json(user)
  })

router.get('/:id', auth,
  //[param('id').isString().notEmpty()],
  async (req, res) => {
    let { id } = req.params
    let user = await service.getById(id)

    res.status(200).json(user)
  })

router.get('/', auth, async (req, res) => {
  const { query } = req
  let user = await service.get(query)

  res.status(200).json(user)
})

router.put('/', auth, async (req, res) => {
  const { query, body: bodyToUpdate } = req
  let user = await service.update(query, bodyToUpdate)

  res.status(200).json(user)
})

router.delete('/', auth, async (req, res) => {
  const { query } = req
  const deleted = await service.delete(query)
  if (!deleted) {
    res.status(400).json('query incorreta')
  }
  res.status(200).json({ success: true })
})

export default { controller: router, prefix }

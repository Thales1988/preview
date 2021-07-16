import express from 'express'

import { userService } from '../services/index.js'
import { validationCreateUser } from '../validations/users.js'
import validator from '../middleware/validate.js'
import auth from '../middleware/auth.js'
//import { body, param, validationResult } from 'express-validator'

const router = express.Router()

router.get('/health', (req, res) => {
  res.status(200).json({ message: 'API funcionando' })
})

router.post('/users', validationCreateUser, validator,
  async (req, res) => {
    let { body } = req

    let user = await userService.create(body)

    res.status(201).json(user)
  })

router.get('/user/:id', auth,
  //[param('id').isString().notEmpty()],
  async (req, res) => {
    let { id } = req.params
    let user = await userService.getById(id)

    res.status(200).json(user)
  })

router.get('/user', auth, async (req, res) => {
  const { query } = req
  let user = await userService.get(query)

  res.status(200).json(user)
})

router.put('/user', async (req, res) => {
  const { query, body: bodyToUpdate } = req
  let user = await userService.update(query, bodyToUpdate)

  res.status(200).json(user)
})

router.delete('/user', auth, async (req, res) => {
  const { query } = req
  const deleted = await userService.delete(query)
  if (!deleted) {
    res.status(400).json('query incorreta')
  }
  res.status(200).json({ success: true })
})

export default router

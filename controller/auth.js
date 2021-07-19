import express from 'express'

import { userService } from '../services/index.js'
import validator from '../middleware/validate.js'

const router = express.Router()

const prefix = 'auth'

let service = new userService()

router.post('/signin', async (req, res) => {
  let { body } = req
  try {
    let token = await service.signin(body)
    res.status(201).json({ token: token })
  }
  catch ({ message }) {
    res.status(401).json({ message })
  }
})

export default { controller: router, prefix }

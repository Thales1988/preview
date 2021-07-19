import express from 'express'

import { postService } from '../services/index.js'
import { validationCreatePost } from '../validations/posts.js'
import validator from '../middleware/validate.js'
import auth from '../middleware/auth.js'
//import { body, param, validationResult } from 'express-validator'

let service = new postService()

const router = express.Router()

const prefix = 'post'

router.post('/', auth, validationCreatePost, validator,
  async (req, res) => {
    let { body } = req

    let post = await service.create({
      ...body,
      user: req.user._id
    })

    res.status(201).json(post)
  })

router.get('/', auth, async (req, res) => {
  const { query } = req
  const { _id } = req.user
  console.log(req.user, user)

  let user = await service.get({ user: _id })
  res.status(200).json(user)
})

export default { controller: router, prefix }

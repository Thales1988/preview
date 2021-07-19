import { body } from 'express-validator'


const validationCreatePost = [
  body('message')
    .isString()
    .withMessage('message precisa ser string')
    .notEmpty()
    .withMessage('message é obrigatório'),
]

export { validationCreatePost }

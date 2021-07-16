import { body } from 'express-validator'
import { userService } from '../services/index.js'


const validationCreateUser = [
  body('name')
    .isString()
    .withMessage('nome precisa ser string')
    .notEmpty()
    .withMessage('nome é obrigatório'),
  body('email')
    .isEmail()
    .withMessage('email inválido')
    .notEmpty()
    .withMessage('email obrigatório'),
  body('cpf')
    .isString()
    .withMessage('cpf precisa ser string')
    .notEmpty()
    .withMessage('cpf obrigatório')
    .customSanitizer((value) => {
      return value.replaceAll('.', '').replaceAll('-', '')
    })
    .custom(async (value) => {
      let exist = await userService.verifyIfUserExist(value)
      if (exist) {
        throw new Error('CPF ja existe')
      }
    }),
  body('password')
    .isString()
    .withMessage('senha precisa ser string')
    .notEmpty()
    .withMessage('password é obrigatório'),
]

export { validationCreateUser }

import { verifyToken } from "../helpers/token.js"
import { userService } from "../services/index.js"

let serviceUser = new userService()

export default async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    let user = verifyToken(token)

    let exist = await serviceUser.verifyIfUserIsActive(user.cpf)

    if (!exist) {
      throw new Error()
    }
    req.user = user
    next()

  } catch (error) {
    res.status(401).json({ message: 'authentication failed' })
  }
}

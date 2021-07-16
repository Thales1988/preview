import { verifyToken } from "../helpers/token.js"

export default (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    let user = verifyToken(token)
    req.user = user
    next()

  } catch (error) {
    res.status(401).json({ message: 'authentication failed' })
  }
}

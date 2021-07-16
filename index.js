import express from 'express'
import dotenv from 'dotenv'
import connectMongoose from './clients/mongoose.js'
import controller from './controller/index.js'

const app = express()

const { PORT } = process.env

app.use(express.json())

connectMongoose()

controller.forEach((controller) => app.use('/', controller))

const server = app.listen(PORT, () =>
  console.log(`API funcionando na porta ${PORT}`)
)

export default server

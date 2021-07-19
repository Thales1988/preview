import express from 'express'
import connectMongoose from './clients/mongoose.js'
import controller from './controller/index.js'

const { PORT } = process.env

const app = express()

app.use(express.json())

connectMongoose()

controller.forEach(({ controller, prefix }) =>
  app.use(`/api/${prefix}`, controller))

const server = app.listen(PORT, () =>
  console.log(`API funcionando na porta ${PORT}`)
)

export default server

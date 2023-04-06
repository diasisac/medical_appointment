import express from 'express'
import { userRouter } from './routes/user.routes'
import swaggerUI from 'swagger-ui-express'
import swaggerDocument from '../swagger.json'

const app = express()

app.use(express.json())

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.use(userRouter)

app.listen(3000, () => {
  console.log('Server started on port 3000')
})

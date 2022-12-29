import express from 'express'

const app = express()

app.get('/', (_req, res) => {
  res.send('Show de bola!!! A aplicação está funcionando!')
})

app.listen(3000, () => {
  console.log('Server started on port 3000')
})

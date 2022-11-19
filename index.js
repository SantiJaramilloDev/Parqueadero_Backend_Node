const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const fs = require('fs')

async function main() {
  dotenv.config()
  const app = express()
  const port = 3000
  app.use(express.json({ limit: '7mb', extended: true }))
  app.use(express.urlencoded({ limit: '7mb', extended: true }))

  fs.readdirSync('./routes').map((r) => app.use('/api/v1', require(`./routes/${r}`)))
  app.use('/api/v1/*', (req, res) => {
    res.status(404).json({ error: 'Not found' })
  })

  app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })

  try {
    mongoose
      .connect(process.env.MONGODB)
      .then(() => console.log('DB connected'))
      .catch(error => console.log('DB connection error: ', error))

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}, variables de entorno ${process.env.TEST}`)
    })
  } catch (error) {
    console.error(e)
    process.exit(1)
  }
}

main().catch(console.error)

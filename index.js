const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

async function main() {
  dotenv.config()
  const app = express()
  const port = 3000

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

const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require("dotenv").config()


const authRouter = require('./routes/api/auth')
const usersRouter = require('./routes/api/aboutUsers')
const contactsRouter = require('./routes/api/contacts')

const { status } = require('express/lib/response')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static("publik"))

app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const { status = 500, message = 'servser not found' } = err;
  res.status(status).json({ message: err.message })
})

module.exports = app

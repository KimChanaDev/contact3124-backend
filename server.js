const express = require('express')
const app = express()
const contactsRouter = require('./router/contacts.js')
const usersRouter = require('./router/users.js')
require('dotenv').config()
const cors = require('cors');
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(contactsRouter)
app.use(usersRouter)

let server = app.listen(5000, () => {
    console.log('Started port at 5000')
})

// server.on('close', () => {
//     console.log('Server is shutdown')
//     // client.close()
// })
// process.on('SIGINT', () => {
//     console.log('Server is shutdown')
//     // client.close()
//     process.exit()
// })

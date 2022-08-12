const express = require('express')
const server = express()
const PORT = 3000

server.use(express.json())

const users = []

server.get('/users', (req, res) => { // list all users
    return res.json(users) 
})

server.get('/users/:index', checkUserInArray, (req, res) => {
    return res.json(req.user)
})

server.post('/users', checkUserExists, (req, res) => { // Create new user 
    const { name } = req.body

    users.push(name)

    return res.json(users)
})

server.put('/users/:index', checkUserExists ,checkUserInArray, (req, res) => { // Edit a user
    const { index } = req.params
    const { name } = req.body
    users[index] = name

    return res.json(users)
})

server.delete('/users/:index', (req, res) => { // Delete a user
    const { index } = req.params
    users.splice(index, 1)

    return res.send()
})

server.listen(PORT, () => {
    console.log('Server is started')
})

server
.use((req, res, next) => {
    console.time('Request')
    console.log(`Method: ${req.method} URL: ${req.url}`)
    next()
    
    console.log("Finish")
    console.timeEnd('Request')    
})

function checkUserExists(req, res, next){
    if (!req.body.name) {
        return res.status(400).json({ error: "user name is required" })
    } 
    return next()
}

function checkUserInArray(req, res, next) {
    const user = users[req.params.index]
    if (!user) {
        return res.status(400).json({ error: "user does not exist"})
    }
    req.user = user
    return next()
}



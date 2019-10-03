// implement your API here
const express = require('express')
const db = require('./data/db')

const server = express();

server.use(express.json())

const port = 5000;

server.get('/', (req, res) => {
    res.send('Hello world from express')
})

server.get('/users', (req, res) => {
    db.find().then(users => {
        res.send(users)
    })
    .catch(err => res.status(500).json({ error: "The users information could not be retrieved." }))
})

server.get('/user/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id).then(user => {
        if (!user) {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        } else {
            res.send(user)
        }
    })
    .catch(err => res.json({ message: "error finding the user" }))
})

server.post('/users', (req, res) => {
    const newUser = req.body;
    db.insert(newUser).then(user => {
        if(!user.name || !user.bio) {
            res.status(500).json({ errorMessage: "Please provide name and bio for the user." })
        } else {
            res.status(201).json(user)
        }
    })
    .catch(err => res.json({ errorMessage: "Error creating the user." }))
})

server.put('/user/:id', (req, res) => {
    const newUser = req.body;
    const id = req.params.id;
    db.update(id, newUser).then(user => {
        if (!user) {
            res.status(404).json({ message: "The user with the specified ID does not exist."})
        } else {
            res.json(user)
        }
    })
    .catch(err => res.json({ message: "Error updating the user."}))
})

server.delete('/user/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id).then(user => {
        if (!user) {
            res.status(404).json({ message: "The user with the specified ID does not exist."})
        } else {
            res.json(user)
        }
    })
    .catch(err => res.json({ message: "Error deleting the user."}))
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})
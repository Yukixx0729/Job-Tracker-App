const express = require('express')
const db = require('../models/db')
const { getAllToDos, getToDoById, deleteToDoById, createToDo, updateToDo } = require('../models/todo')
const router = express.Router()

router.get('/', (req, res, next) => {
    return getAllToDos().then((todos) => {
        res.json(todos)
    })
    
  })

router.get('/:id', (req, res, next) => {
    id = Number(req.params.id)
    return getToDoById(id)
        .then((todo) => res.json(todo))
})

router.delete('/:id', (req, res, next) => {
    const id = Number(req.params.id);
  
    return deleteToDoById(id)
      .then(result => {
        if (result.rowCount === 0) {
            const customError = new Error("Cannot find to do with id: " + id)
            customError.status = 404
            next(customError)
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        next(err)
      });
})

router.post('/', (req, res, next) => {
    const { title, description, due_date, priority, status } = req.body
    console.log('Received body', { title, description, due_date, priority, status })

    if(!title){
        const customError = new Error("Title cannot be empty")
        customError.status = 400
        return next(customError)
    }
    createToDo(title, description, due_date, priority, status)
        .then((result) => {
            res.status(201)
            res.json({
                id: result.rows[0].id, 
                title, 
                description, 
                due_date, 
                priority,
                status
            })
        }).catch((err) => {
            next(err)
        })
})

router.put('/:id', (req, res) => {
    const id = Number(req.params.id);
  
    const { title, description, due_date, priority, status } = req.body;
    console.log('Received body', { title, description, due_date, priority, status });
  
    return updateToDo(id, title, description, due_date, priority, status)
    .then(updatedToDo => res.json(updatedToDo));

})


module.exports = router;
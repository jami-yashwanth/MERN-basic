const express = require('express');
const router = express.Router();

let exercises = require('../models/excercise.model');

router.route('/').get((req,res) => {
    exercises.find()
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req,res) => {
    const username = req.body.username;
    const discription = req.body.discription;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);
    const newExercise = new exercises({
        username,
        discription,
        duration,
        date,
    })

    newExercise.save()
        .then(() => res.json('Exercise Added!!!'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').get((req,res) =>{
    exercises.findById(req.params.id)
        .then((exercise => res.json(exercise)))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').delete((req,res) =>{
    exercises.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted!!'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/update/:id').post((req,res) =>{
    exercises.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.discription = req.body.discription;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json('Exercise Updated!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router;
const router = require('express').Router();

const Question = require('../models/ques');
const User = require('../models/user');

router.get('/:id', (req, res, next) => {
    Question.find().toArray()
    .then(documents => {
        res.status(200).json({
            message: "Questions Fetched Successfully",
            results: documents
        });
        console.log(results[0]);
    })
    .catch(error => { 
        res.status(500).json(
            {
                message: 'Failed to fetch Questions',
                error: error
            }
        );
    });
});

router.post('/save', (req, res, next) => {
    let result = req.body.results;
    const question = new Question({
        question: result
    });
    question
    .save()
    .then(result => {
        res.status(201).json({
            message: 'Question Added',
            result: result
        });
    })
    .catch(err => {
        res.status(500).json({
            message: err
        });
    });
});

router.post('/mark', (req, res, next) => {
    userEmail = req.body.userEmail;
    marks = req.body.marks;
    console.log(marks);
    User.updateOne(
        { email: userEmail }, 
        { marks: marks }
    )
    .then(response => {
        res.status(200).json({
            message: 'Marks Updated',
            response: response
        });
    })
    .catch(error => {
        res.status(500).json({
            message: 'Update Failed', 
            error: error
        });
    });
});

module.exports = router;
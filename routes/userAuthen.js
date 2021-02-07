const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email.trim().toLowerCase(),
            password: hash
        });
        user.save()
        .then(result => {
            res.status(201).json({
                message: 'User created',
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 'Invalid data'
            });
        });
    });
});

router.post('/login', (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email.trim().toLowerCase() })
    .then(user => {
        if(!user) {
            return res.status(401).json({
                message: 'No user'
            });
        }
        fetchedUser = user;
        console.log(fetchedUser);
        return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
        if (!result) {
          return res.status(401).json({
            message: "Invalid data2"
          });
        }
        
        res.status(200).json({
          message: true
        });
      }) 
      .catch(err => {
        return res.status(401).json({
            message: 'Invalid data3'
        });
      });
  });

module.exports = router;
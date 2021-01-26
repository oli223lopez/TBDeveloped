const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require('../../models/User')
const keys = require('../../config/keys')
const jwt = require('jsonwebtoken')
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const passport = require('passport')


router.get('/test', (req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(404).json(err));

})
module.exports = router;

router.post('/register', (req, res) => {

    const { errors, isValid } = validateRegisterInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(400).json({
                    email: "A user has already registered with this address"
                })
            } else {
                const newUser = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                })

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash
                        newUser.save().then(async user => 
                                {
                                    User.findOne({email: user.email})
                                        .populate('question')
                                        .then(user => {
                                            
                                            const payload = {
                                                id: user.id,
                                                username: user.username,
                                                email: user.email,
                                                questions: user.questions,
                                                activeChats: user.activeChats
                                            }
                                            jwt.sign(
                                                payload,
                                                keys.secretOrKey,
                                                { expiresIn: 3600 },
                                                (err, token) => {
                                                    res.json({
                                                        success: true,
                                                        token: 'Bearer ' + token
                                                    });
                    
                                                }
                                            )

                                        })

                                }
                                ).catch(err => console.log(err))
                    })
                })

            }
        })

})


router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        // .populate('questions')
        // .populate({
        //     path: 'activeChats',
        //     populate: {
        //         path: 'messages',
        //         model: 'Message',
        //     },
        //     path: 'activeChats',
        //     populate: {
        //         path: 'responderID posterID',
        //         model: 'User'
        //     },
        // })
        .then(user => {
            if (!user) {
                return res.status(404).json({ email: 'This user does not exist' })
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: user.id,
                            username: user.username,
                            email: user.email,
                            activeChats: [],
                            questions: []
                        }
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            { expiresIn: 3600},
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                });

                            }
                        )
            
                    } else {
                        return res.status(400).json({ password: 'Incorrect password' });
                    }
                })
        })

})




router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.findById(req.user._id)
    .populate('questions')
    .populate({
        path: 'activeChats',
        populate: {
            path: 'messages',
            model: 'Message',
        },
        path: 'activeChats',
        populate: {
            path: 'responderID posterID',
            model: 'User'
        },
    })
    .then(user => {res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        questions: user.questions,
        activeChats: user.activeChats
    })})

})




//  Nested populate for fetching all users, their active chats, messages, and questions 
router.get('/', (req, res) => {
    User.find()
    .populate('activeChats')
    .populate({
        path: 'activeChats', 
        populate: {
            path: 'messages',
            model: 'Message'
        }
    })
    .then(users => {res.json(users)})
})


module.exports = router


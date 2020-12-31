
const express = require("express");
const router = express.Router();
const Response = require('../../models/Response');
const passport = require("passport"); // not passport.js
const validateResponse = require("../../validation/response")

router.get('/', (req, res) => {
    Response.find()
    .sort({timestamps: -1})
    .then(responses => res.json(responses))
    .catch(err => res.status(404).json(err))
})

router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {

    const { errors, isValid } = validateResponse(req.body); 

    if(!isValid) {
        return res.status(400).json(errors);
    } else {

        const newResponse = new Response({
            user: req.user.id, 
            consultation: req.body.consultation, 
            answer: req.body.answer
        })
        newResponse.save().then(response => res.json(response))
    }
})

router.get("/:id", passport.authenticate('jwt',{session:false}), (req, res) => {
    let responseId = req.params.id
    Response.findById(responseId)
    .then(response => res.json(response))
    .catch(err => res.status(404).json('responses not found'))
})

router.patch("/:id", passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        let response = await Response.findById(req.params.id)

        const { errors, isValid } = validateResponse(req.body); 

        if(req.user.id === String(response.id) && isValid) {
            response.consultation = req.body.consultation
            response.answer = req.body.answer
            await response.save()
            res.send(response)
            
        } else {
            throw "this response doesn't belong to you!"
        }

    } catch(err) {
        res.status(404).json({
            error: err
        })
    }
})

module.exports = router; 


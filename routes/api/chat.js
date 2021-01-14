const express = require("express")
const router = express.Router();
const passport = require("passport");
const validateChat = require('../../validation/chat')
const Chat = require('../../models/Chat');
const User = require('../../models/User')


router.get('/test', (req, res) => {
    res.json({msg: 'This is the chat route'})
})


router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    //check validation
    const { errors, isValid } = validateChat(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    Chat.findOne({ response: req.body.responseID}).then(async chat => {
        if(chat){
            return res.status(400).json({
            Error: "Chat has already been initiated"})
        }else{
            const newChat = new Chat({
                question: req.body.questionID,
                response: req.body.responseID

            })
            newChat.save().then(chat => res.json(chat))
            console.log(newChat)
            // User.findById(req.body.posterID).then(res => res.activeChats.push(newChat))
            // // console.log(poster)
            // User.findById(req.body.responseUserID).then(res => res.activeChats.push(newChat))

            let poster = await User.findById(req.body.posterID)
            poster.activeChats.push(newChat._id)
            poster.save()


            let responder = await User.findById(req.body.responseUserID)
            responder.activeChats.push(newChat._id)
            responder.save()
        }
    })
});



router.get('/:id', (req, res) => {

    Chat.findById(req.params.id)
        .populate('messages')
        .then(chat => res.json(chat))
        .catch(err => res.status(404).json("chat not found"))
});






router.get('/:id', (req, res) => {
    Chat.findById(req.body.id)
        .populate('messages')
        .then( chat => {res.json(chat)})
        .catch(err => res.status(404).json(err))
})

module.exports = router



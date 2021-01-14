const express = require("express")
const router = express.Router();
const passport = require("passport");
import validateChat from ('../../validation/chat')

const Chat = require('../../models/Chat');


router.get('/test', (req, res) => {
    res.json({msg: 'This is the chat route'})
})


router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    //check validation
    const { errors, isValid } = validateChat(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    Chat.findOne({ responseId: req.body.response}).then(async chat => {
        if(chat){
            Error: "Chat has already been initiated"
        }else{
            const newChat = new Chat({
                question: req.body.questionID,
                response: req.body.responseID
            })
            newChat.save().then(chat => res.json(chat))
            let poster = User.findById(req.body.posterID)
            let responseUser = User.findById(req.body.responseUserID)

            poster.activeChats.push(newChat._id)
            responseUser.activeChats.push(newChat._id)
        }
    })
});



router.get('/:id', (req, res) => {
    Chat.findById(req.body.id)
        .populate('messages')
        .then( chat => {res.json(chat)})
        .catch(err => res.status(404).json(err))
})












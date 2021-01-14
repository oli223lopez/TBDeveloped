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
                questionId: req.body.questionId,
                responseId: req.body.responseId
            })
            newChat.save().then(chat => res.json(chat))
            let question = await Question.findById(req.body.questionId)
            let response = await Response.findById(req.body.responseId) 
            let questionUser = await User.findById(question.user._id)
            let responseUser = await User.findById(response.user._id) 

            questionUser.chat.push(newChat._id)
            responseUser.chat.push(newChat._id)
        }
    })
});



router.get('/:id', (req, res) => {
    Chat.findById(req.body.id)
        .populate('messages')
        .then( chat => {res.json(chat)})
        .catch(err => res.status(404).json(err))
})












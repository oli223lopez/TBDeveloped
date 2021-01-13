const express = require("express")
const router = express.Router();
const passport = require("passport");

const Chat = require('../../models/Chat');


router.get('/test', (req, res) => {
    res.json({msg: 'This is the chat route'})
})


router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    //check validation
    // const { errors, isValid } = validateQuestionInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    Chat.findOne({ questionId: req.body.questionId}).then(async chat => {
        if(chat){
            Error: "Chat has already been initialted"
        }else{
            const newChat = new Chat({
                questionId: req.body.questionId
            })
            newChat.save().then(chat => res.json(chat))
        }
    })
});



router.get('/:id', (req, res) => {
    Chat.findById(req.body.id)
        .populate('messages')
        .then( chat => {res.json(chat)})
        .catch(err => res.status(404).json(err))
})












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
            Error: "Chat has already been initiated. \nPlease check the message icon in your navbar to continue the conversation"})
        }else{
            const newChat = new Chat({
                question: req.body.questionID,
                //questionSubject: req.body.subject
                response: req.body.responseID,
                questionSubject: req.body.questionSubject,
                posterID: req.body.posterID,
                responderID: req.body.responderID

            })
            newChat.save().then(chat => res.json(chat))

            let poster = await User.findById(req.body.posterID)
            poster.activeChats.push(newChat._id)
            poster.save()


            let responder = await User.findById(req.body.responderID)
            responder.activeChats.push(newChat._id)
            responder.save()
        }
    })
});



router.get('/:id', (req, res) => {

    
    Chat.findById(req.params.id)
        .populate('question')
        .populate('posterID')
        .populate('responderID')
        .populate('messages')
        .then(chat => res.json(chat))
        .catch(err => res.status(404).json("chat not found"))
});


// route for getting all chats, with populate for questions and messages 
// router.get('/', (req, res) => {
//     Chat.find()
//         .populate('question')
//         .populate('message')
//         .then(chats => res.json(chats))
//         .catch(err => res.status(404).json("chats not found"))
// })

module.exports = router



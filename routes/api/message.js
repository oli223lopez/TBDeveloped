const express = require("express")
const router = express.Router();
const passport = require("passport");
const Message = require('../../models/Message');
const Chat = require('../../models/Chat');
const validateMessages = require('../../validation/message')



router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    //check validation
    const { errors, isValid } = validateMessages(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newMessage = new Message({
        chatId: req.body.chatId,
        user: req.body.user,
        sentence: req.body.sentence
    })
    newMessage.save().then(chat => res.json(chat))
        .catch(err => res.status(404).json(err));

    let chat = await Chat.findById(req.body.chatId)
    chat.messages.push(newMessage._id);
    chat.save()

});



router.get('/', (req, res) => {

    Message.find()
        .then(messages => { res.json(messages) })
        .catch(err => res.status(404).json(err));
});


router.get('/:id', (req, res) => {
    Message.findById(req.params.id)
        .then(question => res.json(question))
        .catch(err => res.status(404).json("question not found"))
})

module.exports = router

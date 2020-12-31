const express = require("express")
const router = express.Router();
const passport = require("passport");
const validateQuestionInput = require('../../validation/question');
const Question = require('../../models/Question');

//test
router.get('/test', (req, res) => {
    res.json({ msg: "This is the question route" })
})
//test

//retreiving all the questions
router.get('/',(req,res) => {
    Question.find()
    .sort({timestamps:-1})
    .then(questions => res.json(questions))
    .catch(err => res.status(404).json(err));
});


//retreiving one quesion
router.get('/:id',(req,res)=>{
    Question.findById(req.params.id)
    .then(question => res.json(question))
    .catch(err => 
        res.status(404).json(err))
})


//posting questions
router.post('/',
    passport.authenticate('jwt',{session:false}),
    
    (req,res) =>{

        console.log(payload)
        //check validation
        const {errors, isValid} = validateQuestionInput(req.body);
        if(!isValid){
            return res.status(400).json(errors);
        }
        const newQuestion = new Question({
            subject: req.body.subject,
            content: req.body.content,
            tag: req.body.tag,
            solved: req.body.solved

    });

    newQuestion.save().then(question => res.json(question));
});



module.exports = router;
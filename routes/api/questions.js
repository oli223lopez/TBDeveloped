const express = require("express")
const router = express.Router();
const passport = require("passport");
const validateQuestionInput = require('../../validation/question');
const Question = require('../../models/Question');
const User = require('../../models/User');


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
    .catch(err => res.status(404).json(err))
})

//posting questions
router.post('/',passport.authenticate('jwt',{session:false}),(req,res) =>{
        //check validation
        const {errors, isValid} = validateQuestionInput(req.body);
         if (!isValid) {
             return res.status(400).json(errors);
         }
        Question.findOne({subject:req.body.subject}).then( question => {
            if (question) {
                return res.status(400).json({
                Error: "Question has already been submitted"
                })       
            } 
            else {
              
               const newQuestion = new Question({
                user: req.user.id,
                subject: req.body.subject,
                content: req.body.content,
                tag: req.body.tag,
                solved: req.body.solved
        });
         newQuestion.save().then(question => res.json(question));
      }
    
        })
    
});


//editing a question
// router.put("/:id/update", (res,req) => {
//     let updates = req.body

//     Question.findOneAndUpdate({
//         _id: req.params.id,updates, new: true})
//         .then(updatedQuestion => res.json(updatedQuestion))
//         .catch(err => res.status(404).json("Error: " + err))
// });



router.patch("/:id", passport.authenticate('jwt',{session:false}), async (req, res) => {
    try {
        let question = await Question.findById(req.params.id)
        // console.log("user: " + question.user)
        // console.log("req user " + req.user.id )
        if(req.user.id ===  `${question.user}`){
        
            if (req.body.content) {
                question.content = req.body.content
            }
            
            if (req.body.tag) {
                question.tag = req.body.tag
            }

            if (req.body.solved) {
                question.solved = req.body.solved
            }

            await question.save()
            res.send(question)
        }else {
        res.status(404).json({
            error: 'Incorrect user'
        })

        }
	} catch(err) {
       
        res.status(404).json({
            error: "Question doesn't exist!"
        })
    }
    
})




//deleting a question
router.delete("/:id", passport.authenticate('jwt',{session:false}), async (req, res) => {

    // console.log('1', req.user.id)
    const question = await Question.findOne({ _id: req.params.id })
    // console.log('2', question.user)

    if (`${question.user}` === req.user.id){
        Question.findByIdAndDelete(req.params.id)
        .then(() => res.json("Question deleted"))
        .catch(err => res.status(404).json(err))
    } else{
        res.status(404).json({error: 'Incorrect user'})
    }
    
})

module.exports = router;


 
const express = require("express")
const router = express.Router();
const passport = require("passport");
const validateQuestionInput = require('../../validation/question');
const validateResponse = require('../../validation/response')
const Question = require('../../models/Question');
const User = require('../../models/User');


//test
router.get('/test', (req, res) => {
    res.json({ msg: "This is the question route" })
})



router.get('/profile_questions', (req, res) => {
    
    Question.find()
        .then(questions => {
            const questionArray = []
            questions.forEach(question => {
                if(req.body.questions.includes(question._id)){
                    questionArray.push(question)
                }
            })
            res.json(questionArray)
        })
        .catch(err => res.status(404).json('this doesnt work'));
        

})

//retreiving all the questions
router.get('/',(req,res) => {
    
    Question.find()
    .populate('user')
    .populate({
        path: 'responses',
        populate: {
            path: 'user',
            model: 'User'
        }
    })
    .sort({timestamps:-1})
    .then(questions => {res.json(questions)})
    .catch(err => res.status(404).json(err));
});


//retreiving one quesion
router.get('/:id',(req,res)=>{
    Question.findById(req.params.id)
    // .populate('user')
    .populate('user')
    .populate({
        path: 'responses',
        populate: {
            path: 'user',
            model: 'User'
        }
    })
    
    .then(question => res.json(question))
    .catch(err => res.status(404).json("question not found"))
})


//posting questions
router.post('/', passport.authenticate('jwt',{session:false}), async (req,res) =>{
        //check validation
        const {errors, isValid} = validateQuestionInput(req.body);
         if (!isValid) {
             return res.status(400).json(errors);
         }
        Question.findOne({subject:req.body.subject}).then( async question => {
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
         newQuestion.save().then(question => res.json(question))

         let user = await User.findById(req.user.id)
         user.questions.push(newQuestion._id)
         user.save()
        
      }
    
        })
    
});




router.patch("/:id", passport.authenticate('jwt',{session:false}), async (req, res) => {
    try {
        let question = await Question.findById(req.params.id)
            .populate('user')
            .populate({
                path: 'responses',
                populate: {
                    path: 'user',
                    model: 'User'
                }
            })

        if(req.user.id ===  `${question.user._id}`){
        
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

    const question = await Question.findOne({ _id: req.params.id })

    if(question) {
        if (`${question.user}` === req.user.id){
            Question.findByIdAndDelete(req.params.id)
            .then(  async () => {

                let users = []; 

                users.push(question.user)

                question.responses.forEach(response => {
                    users.push(response.user)
                })

                users.forEach(async user => {
                    let questionUser = await User.findById(user._id)
                    let questionIdx = questionUser.questions.indexOf(question._id)
                    questionUser.questions.splice(questionIdx, 1)
                    await questionUser.save()
                } )

            }
            )
            .then(() => res.json(question))
            .catch(err => res.status(404).json(err))
        } else{
            res.status(404).json({error: 'Incorrect user'})
        }
    } else {
        res.json("question not found")
    }
})


// responses
router.post("/:id/responses", passport.authenticate('jwt',{session:false}), async (req, res) => {
    
    let question = await Question.findById(req.params.id)

    const { errors, isValid } = validateResponse(req.body);

    if (question) {

        if (!isValid) {

            return res.status(400).json(errors)

        } else {


            question.responses.push(Object.assign(req.body, {user: req.user.id}))
            question.save( function (err) {
                if (!err) res.json(question)
            })

            let user = await User.findById(req.user.id)

            let existingID = user.questions.find(id => id.toString() === question._id.toString())
            
            if(!existingID) {
                user.questions.push(question._id)
                user.save()
            } else {
                null
            }

        }

    } else {
        res.json("question does not exist.")
    }
})

router.delete("/:questionId/responses/:responseId", passport.authenticate('jwt',{session:false}), async (req, res) => {
    let question = await Question.findById(req.params.questionId);
    let response = await question.responses.id(req.params.responseId)
    let user = await User.findById(response.user)

    if(question && response) {

        if (`${response.user}` === req.user.id){
       
            question.responses.id(req.params.responseId).remove();
            question.save(function (err) {
                res.json(response)
            })

            let questionIdx = user.questions.indexOf(question._id)
            user.questions.splice(questionIdx, 1)
            await user.save()
            
        } else{
            res.status(404).json('You can only delete your own responses.')
        }
        
    } else {
        res.json("question and/or response does not exist.")
    }
})

module.exports = router;



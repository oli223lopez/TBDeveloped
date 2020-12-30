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
    .catch(err => res.status(404).json(err))
})

//posting questions
router.post('/',
    passport.authenticate('jwt',{session:false}),
    (req,res) =>{
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


//editing a question
// router.put("/:id/update", (res,req) => {
//     let updates = req.body

//     Question.findOneAndUpdate({
//         _id: req.params.id,updates, new: true})
//         .then(updatedQuestion => res.json(updatedQuestion))
//         .catch(err => res.status(404).json("Error: " + err))
// });



router.patch("/:id", async (req, res) => {
	try {
		const question = await Question.findById(req.params._id)

		if (req.body.subject) {
			question.subject = req.body.subject
		}

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
	} catch {
		res.status(404)
		res.send({ error: "Question doesn't exist!" })
	}
})



//! CURRENTLY ONLY UPDATES CONTENT

//deleting a question
router.delete("/:id", (req, res) => {
  Question.findByIdAndDelete(req.params.id)
    .then(() => res.json("Question deleted"))
    .catch(err => res.status(404).json(err))
})
//!TEST FOR UNIQUENESS OF SUBJECT

module.exports = router;
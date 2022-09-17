const express = require("express");

const router = express.Router();
const AnswerDB = require("../models/Answer");

router.post("/", async(request,response)=>{
    const answerData = new AnswerDB({
        question_id: request.body.question_id,
        answer: request.body.answer,
        user: request.body.user
    })

    await answerData.save().then((doc)=>{
        response.status(201).send({
            status: true,
            data: doc
        })
    }).catch((err)=>{
        response.status(400).send({
            status: false,
            message: "Error while adding answer"
        })
    })
})


module.exports = router;
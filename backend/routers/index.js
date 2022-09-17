const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const questionRouter = require("./Question");
const answerRouter = require("./Answer");
const commentRouter = require("./Comment");

router.get("/", (request,response)=>{
    response.send("Welcome to stack Overflow");
})

router.use("/question", questionRouter);
router.use("/answer", answerRouter);
router.use("/comment", commentRouter);

module.exports = router;
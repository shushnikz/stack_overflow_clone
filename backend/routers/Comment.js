const express = require("express");

const router = express.Router();
const CommentDB = require("../models/Comment");

router.post("/:id", async (request,response)=>{
    try {
        await CommentDB
          .create({
            question_id: request.params.id,
            comment: request.body.comment,
            user: request.body.user,
          })
          .then((doc) => {
            response.status(201).send({
              status: true,
              message: "Comment added successfully"
            });
          })
          .catch((err) => {
            response.status(400).send({
              status: false,
              message: "Bad format"
            });
          });
      } catch (err) {
        response.status(500).send({
          status: false,
          message: "Error while adding comments"
        });
      }
})

module.exports = router;
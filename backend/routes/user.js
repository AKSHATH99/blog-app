const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const post = require("../models/post");
const comment = require("../model/comments");
const jwt = require("jsonwebtoken");
const verify = require("../verifytoken");
const verifytoken = require("../verifytoken");

router.put("/:id", verifytoken, async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hashSync(req.body.password, salt);
    }

    const updatedUser = await User.findByIDAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(err)
  } catch (error) {
    res.status(404).json("couldnt update");
  }
});

//DELETEING
router.put("/:id", verifytoken, async (req, res) => {
  try {
    await User.findByIDAndDelete(req.params.delete);
    await post.deleteMany({userId: req.params.delete});
    await comment.deleteMany({userId: req.params.delete});
    res.status(200).json("DELETED SUCCESSFULLY ")
  } catch (error) {
    res.status(404).json("couldnt delete");
  }
});


// FETCHING
router.put("/:id", verifytoken, async (req, res) => {
    try {
     const user= await User.findByID(req.params.id);
     const{password, ...info} =  user._doc;
     res.status(200).json(info)
    } catch (error) {
      res.status(404).json("couldnt fetch");
    }
  });

  module.exports= router;
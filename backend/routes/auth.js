const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(password)
    const salt = await bcrypt.genSalt(10);
    console.log(salt)
    const hashedpassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedpassword,
    });
    const saveduser = await newUser.save();
    if (saveduser) {
      res.status(200).json(saveduser);
    }
  } catch (error) {
    console.log(" error while registration ", error);
    res.status(500).json(error);
  }
});

//LOGIN

router.post("/loign", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json("NOT FOUND USER");
    }
    //unhashing the password and comparing
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(404).json("Wrong password");
    }

    //creating token

    const token = jwt.sign(
      { _id, username: user.username, email: user.email },
      process.env.SECRET,
      { expiresIn: "3d" }
    );
    const {password , ...info} = user._doc;
    res.cookie("token" , token , {
        httpOnly:true,
        secure: true,
        sameSite:'none'
    }).status(200).json(info)


  } catch (error) {
    console.log(" error while signing in ", error);
    res.status(500).json(error);
  }
});

//logout 
router.get("/logout", async (req, res) => {
    try {
        res.clearCookie("token" , {sameSite:'none', secure:true}).status(200).send("user logout success");
    }catch(err){
        res.status(500).json("error while loging out " , err)
    }
  });


//data fethc
router.get("/logout", async (req, res) => {
    try {
        const   token = req.cookies.token;
        jwt.verify(token , process.env.SECRET , {} , async(err , data)=>{
            if(err){
                return res.status(404).json(err)
            }
            res.status(200).json(data);
        })
    }catch(err){
        res.status(500).json("error while loging out " , err)
    }
  });

  module.exports = router; 
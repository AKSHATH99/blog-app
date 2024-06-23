const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const multer = require("multer");
const cors = require("cors");
const path  = require("path")
const cookieParser = require("cookie-parser")
const authRoute = require("./routes/auth")
const commentsRoute = require("./routes/comment")
const postRoute = require("./routes/post")
const userRoute = require("./routes/user")

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

const connectDB = async()=>{
    try {
        console.log(process.env.MONGO_URL)
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB CONNECTED ")
    } catch (error) {
        console.log(error)
    }
}

//middlewares
dotenv.config({
    path: "./.env",
  });
app.use(express.json());
app.use("/images",express.static(path.join(__dirname,"/images")))
console.log(cors());

app.use(cookieParser());

app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)
app.use("/api/comments",commentsRoute)

//image upload logic
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp")
  },
  filename: function (req, file, cb) {
    
    cb(null, file.originalname)
  }
})

const upload = multer({storage})
app.post("/api/upload", upload.single("file") , (req , res)=>{
  res.status(200).json("img uplaod success")
})

app.listen(process.env.PORT, ()=>{
    connectDB();
    console.log("SERVER GOES BRRRRR ")
})  


const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const multer = require("multer");
const cors = require("cors");

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

dotenv.config({
    path: "./.env",
  });
app.use(express.json());

app.listen(process.env.PORT, ()=>{
    connectDB();
    console.log("SERVER GOES BRRRRR ")
})


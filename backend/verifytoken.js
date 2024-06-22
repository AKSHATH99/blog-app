const jwt = require('jsonwebtoken');
const verifytoken = (req , res , next)=>{
    const token = req.cookies.token
    if(!token){
        return res.status(401).json("auth failed")
    }
    jwt.verify(token , process.env.SECRET, async(err ,data)=>{
        if(err){ 
            return res.status(403).json("TOKEN INVALID")
        }
        req.userId = data._id;
        next();
    });
}

module.exports = verifytoken;   
const jwt = require('jsonwebtoken');
require('dotenv').config();
const verify = (req, res, next) =>
{
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(" ")[1];
    if(!token)
        return res.status(400).json({success:false,message:"Missing access token"});
    try 
    {
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        req.userId = decode.userId;
        next();
    } 
    catch (error) 
    {
        console.log(error);
        return res.status(403).json({success:false,message:"Invalid access token"})
    }
}

module.exports = verify;
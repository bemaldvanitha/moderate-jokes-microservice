const jwt = require('jsonwebtoken');

require('dotenv').config();

const secretKey = process.env.JWT_SECRET;

module.exports = function (req,res,next) {

    const token = req.header('x-auth-token');

    if(!token){
        return res.status(401).json({msg: 'Authorization denied'});
    }

    try {
        const decoded = jwt.verify(token, secretKey);

        req.email = decoded.email;
        next();

    }catch (err){
        res.status(401).json({msg: 'token is not valid'});
    }
}
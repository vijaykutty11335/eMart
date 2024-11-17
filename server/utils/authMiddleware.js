const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRETE;

function authenticateToken(req,res,next) {
    const authHeader = req.header("Authorization");
    if(!authHeader){
        return res.status(401).json({message: "Unauthorized: Missing Token!"});
    }
    const [bearer, token] = authHeader.split(" ");
    if(bearer !== "Bearer" || !token){
        return res.status(401).json({message: "Unauthorized: Invalid Token Format"});
    }

    jwt.verify(token, secretKey, (err, user) => {
        if(err){
            return res.status(403).json({message: "Forbidden: Invalid Token"});
        }
        req.user = user;
        next();
    })
}

function authorizeRole(requiredRole){
    return(req, res, next) => {
        if(req.user && req.user.role === requiredRole){
            next();
        }
        else{
            return res.status(403).json({message: "Forbidden: You don't have the necessary permissions"});
        }
    }
}

module.exports = {authenticateToken, authorizeRole};
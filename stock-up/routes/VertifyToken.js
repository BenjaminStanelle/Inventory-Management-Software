const jwt = require('jsonwebtoken');

//check if the user had that token or not
module.exports = async function(req, res, next){
    const token = await req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');

    try{
        const verified = jwt.verify(token, TOKEN_SECRET);
        req.user = verified;
        next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }
    
}

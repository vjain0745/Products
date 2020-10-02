const jwt = require("jsonwebtoken");

module.exports = function(req,res ,next){
    const token = req.header("Authorization");
    if(!token) return res.send("denied");
    try{    const verify = jwt.verify(token, "Securitykey");
    req.user = verify;
    }catch{res.send("error")
}
next();
}
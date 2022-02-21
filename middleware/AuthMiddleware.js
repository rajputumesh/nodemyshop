const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
  try{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).json({message:"invalid Token"})
    var decode = jwt.verify(token,'secret');
    req.userData = decode;
    next();
  }catch(err){
    res.status(401).json({message:"invalid Token"});
  }
}

exports.admin = (req, res, next) =>{
  const role = req.userData.role;
  if(role==2){
    res.status(401).json({message:"You have not permission"});
  }else{
    next();
  }
}
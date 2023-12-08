const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { db } = require('../db/config')

exports.protect = async (req, res, next) => {
    let token;
  
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // token in Header
      token = req.headers.authorization.split(" ")[1];
    }else{
      return res.status(400).json({
        message:"You are not authenticated"
      })
    }
  
    if (!token) {
        return res.status(400).json({
            message:"Unauthorized"
          })
    }
    try {
      const decodedData = jwt.verify(token, JWT_SECRET);
  
      const userDetails = await db('users').where({ id: decodedData.id }).first();
      
      if (!userDetails) {
        return res.status(400).json({
          message: "User not found"
        });
      }
  
      req.user = userDetails;
      next();
    } catch (error) {
      return res.status(400).json({
        message: "Unauthorized"
      });
    }
          
        
      };


      
    




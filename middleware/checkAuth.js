const express = require('express');
const jwt = require('jsonwebtoken');
const logger = require('../logger/logger')

const authMiddleware = (req,res,next)=>{

    const headerAuth = req.headers['Authorization'];

    const parts = headerAuth.split(' ');

    // Check if the token is present and in the correct format
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({ message: 'Unauthorized', data: [] });

    }
    const token = parts[1];

    if(!token){
        return res.status(401).json({message:"Unauthorized",data:[]});
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({message:"Unauthorized",data:[]});
        }
        req.userData.user_id=decoded.user_id;
        req.userData.email=decoded.email;
        req.userData.name=decoded.name;
        next();

    }catch(error){
        logger.error(error);
        console.error(error);
        return res.status(500).json({message:"Unauthorized",data:[]});

    }
}

module.exports= authMiddleware;

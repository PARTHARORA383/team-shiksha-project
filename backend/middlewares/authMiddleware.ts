

import { Request , Response , NextFunction } from "express";
import jwt from 'jsonwebtoken'

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

interface JwtPayload {
  userId: string;
  email?: string;
}

export const verifyToken = (req : Request , res  : Response, next : NextFunction )=>{

  const authHeader = req.headers.authorization 
  
  if(!authHeader || !authHeader.startsWith("Bearer ")){
    return res.status(401).json({
      message : "Missing or Invalid token"
    })
  }

  const token = authHeader.split(" ")[1];


  try {
    const decoded = jwt.verify(token , process.env.JWT_SECRET!) as JwtPayload;
    req.user = decoded;
    next();
  }

  catch(e){
    return res.status(403).json({
      message : "Invalid Token"
    })
  }

}
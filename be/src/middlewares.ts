import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { JWT__PASSWORD } from "./config";

export function usermiddleware(req:Request,res:Response,next:NextFunction){

    const authHeader = req.headers.authorization

    if(!authHeader){
        return res.status(401).json({message:"Authorization header missing"})
    }

    console.log("HEADER:", req.headers.authorization);


    const token = authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({message :"Token missing"})
    }

    try{        
        const decoded = jwt.verify(token ,JWT__PASSWORD) as {id:string}; 
        (req as any).userId = decoded.id;
        next();
    }catch(err){
        return res.status(401).json({message:"Invaild token"})
    }

}
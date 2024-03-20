const Jwt = require('jsonwebtoken')
const jwtKey = 'e-commerce';
import { Request,Response,NextFunction } from 'express';


module.exports=function verifyToken(req:Request, resp:Response, next:NextFunction) {
    let token=req.headers['authorization'];
    if(token){
      token=token.split(' ')[1];
      console.log('middleware called ',token); 
      Jwt.verify(token,jwtKey,(err:any,valid:any)=>{
       if(err){
          resp.status(401).send({ result: 'Please provide valid token' });
        }
       else{
         next();
       }
      })
    }
    else{
         resp.status(403).send({ result: 'Please add token with header' });
    }
 }
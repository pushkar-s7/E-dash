import express from 'express';
import { Request,Response } from 'express';
require('../database/config');
const User=require('../database/users');
const Product=require('../database/product');
const Jwt = require('jsonwebtoken')
const jwtKey = 'e-commerce';

const registerPost= async(req:Request,resp:Response)=>{
     const user=new User(req.body);
     let result=await user.save();
     result = result.toObject();
     delete result.password
     if (result) {
        Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err:any, token:string) => {
          if (err) {
            resp.send({ result: 'Something went wrong' })
          }
          resp.send({ result, auth: token });
        })
      }
}
const loginPost=async(req:Request,resp:Response)=>{
    if (req.body.email && req.body.password) {
        let user = await User.findOne(req.body).select("-password");
        console.log(user);
        if (user) {
          Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err:any, token:string) => {
            if (err) {
              resp.send({ result: 'Something went wrong' })
            }
            resp.send({ user, auth: token });
          })
        }
        else {
          resp.send({ result: 'No user found' })
        }
      }
      else {
        resp.send({ result: 'No userss found' })
      }
}

const addProductPost=async(req:Request,resp:Response)=>{
        let product = new Product(req.body);
        let result = await product.save();
        resp.send(result);
}

const getProduct= async (req:Request, resp:Response) => {
    let products = await Product.find();
    if (products.length > 0) {
      resp.send(products);
    } else {
      resp.send('No product found');
    }
  }
const deleteProduct= async (req:Request, resp:Response) => {
    const result = await Product.deleteOne({ _id: req.params.id });
    resp.send(result);
  }
const getProductId= async (req:Request, resp:Response) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
      resp.send(result);
    } else {
      resp.send({ result: "No record found" });
    }
  }
    
 const updateProduct=async (req:Request, resp:Response) => {
    let result = await Product.updateOne(
      { _id: req.params.id },
      {
        $set: req.body
      }
    )
    resp.send(result);
  }
  
const searchProduct= async (req:Request, resp:Response) => {
    let result = await Product.find({
      "$or": [
        {
           name: { $regex: req.params.key } 
        },
        { 
          company: { $regex: req.params.key } 
        },
        { 
          category: { $regex: req.params.key } 
        }
      ]
    });
    resp.send(result);
  }

module.exports={registerPost,
                loginPost,
                addProductPost,
                getProduct,deleteProduct,getProductId,updateProduct,searchProduct}
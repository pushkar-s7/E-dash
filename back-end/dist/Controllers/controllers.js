"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require('../database/config');
const User = require('../database/users');
const Product = require('../database/product');
const Jwt = require('jsonwebtoken');
const jwtKey = 'e-commerce';
const registerPost = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new User(req.body);
    let result = yield user.save();
    result = result.toObject();
    delete result.password;
    if (result) {
        Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
            if (err) {
                resp.send({ result: 'Something went wrong' });
            }
            resp.send({ result, auth: token });
        });
    }
});
const loginPost = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.email && req.body.password) {
        let user = yield User.findOne(req.body).select("-password");
        console.log(user);
        if (user) {
            Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    resp.send({ result: 'Something went wrong' });
                }
                resp.send({ user, auth: token });
            });
        }
        else {
            resp.send({ result: 'No user found' });
        }
    }
    else {
        resp.send({ result: 'No userss found' });
    }
});
const addProductPost = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let product = new Product(req.body);
    let result = yield product.save();
    resp.send(result);
});
const getProduct = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let products = yield Product.find();
    if (products.length > 0) {
        resp.send(products);
    }
    else {
        resp.send('No product found');
    }
});
const deleteProduct = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Product.deleteOne({ _id: req.params.id });
    resp.send(result);
});
const getProductId = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield Product.findOne({ _id: req.params.id });
    if (result) {
        resp.send(result);
    }
    else {
        resp.send({ result: "No record found" });
    }
});
const updateProduct = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield Product.updateOne({ _id: req.params.id }, {
        $set: req.body
    });
    resp.send(result);
});
const searchProduct = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield Product.find({
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
});
module.exports = { registerPost,
    loginPost,
    addProductPost,
    getProduct, deleteProduct, getProductId, updateProduct, searchProduct };

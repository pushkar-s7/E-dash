"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Jwt = require('jsonwebtoken');
const jwtKey = 'e-commerce';
module.exports = function verifyToken(req, resp, next) {
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(' ')[1];
        console.log('middleware called ', token);
        Jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                resp.status(401).send({ result: 'Please provide valid token' });
            }
            else {
                next();
            }
        });
    }
    else {
        resp.status(403).send({ result: 'Please add token with header' });
    }
};

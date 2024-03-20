"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user = require("../Controllers/controllers");
const router = express_1.default.Router();
const auth = require("../Middleware/auth");
router.post('/register', user.registerPost);
router.post('/login', user.loginPost);
router.post('/add-product', auth, user.addProductPost);
router.get('/products', auth, user.getProduct);
router.delete('/product/:id', auth, user.deleteProduct);
router.get('/product/:id', auth, user.getProductId);
router.put('/product/:id', auth, user.updateProduct);
router.get('/search/:key', auth, user.searchProduct);
module.exports = router;

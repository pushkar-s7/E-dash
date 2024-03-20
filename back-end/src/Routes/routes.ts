import express from 'express';
const user=require ("../Controllers/controllers")
const router=express.Router();
const auth=require("../Middleware/auth")

router.post('/register',user.registerPost);
router.post('/login',user.loginPost);
router.post('/add-product',auth,user.addProductPost);
router.get('/products',auth,user.getProduct);
router.delete('/product/:id',auth,user.deleteProduct);
router.get('/product/:id',auth,user.getProductId);
router.put('/product/:id',auth,user.updateProduct);
router.get('/search/:key',auth,user.searchProduct);


module.exports=router;
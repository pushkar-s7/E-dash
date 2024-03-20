"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const userRouter = require('./Routes/routes');
const cors = require('cors');
app.use(express_1.default.json());
app.use(cors());
app.use(userRouter);
app.listen(4000, () => {
    console.log('The application is listening on port 4000!');
});
// app.use(express.json());
// app.get('/', (req, res) => {
//     res.send('Well done!');
// })
// app.post('/register',async (req,resp)=>{
//     let user=new User(req.body);
//     let result=await user.save();
//     resp.send(result);
// })

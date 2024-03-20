import express from 'express';
const app = express();
const userRouter=require('./Routes/routes');
const cors = require('cors');
app.use(express.json());
app.use(cors());

app.use(userRouter);

app.listen(4000, () => {
    console.log('The application is listening on port 4000!');
})











































// app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('Well done!');
// })

// app.post('/register',async (req,resp)=>{
//     let user=new User(req.body);
//     let result=await user.save();
//     resp.send(result);
// })
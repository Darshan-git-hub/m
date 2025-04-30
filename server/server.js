const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/reg').then(()=>{
    console.log("connected db");
});
const userscheme = new mongoose.Schema({
    name:String,
    email:String
})
const user = mongoose.model("user",userscheme);

app.post('/register',async (req,res) => {
    await user.create(req.body);
    res.json({message:"Success"});
})
app.post('/update',async (req,res) => {
    const {name , email} = req.body;
    const delname = await user.findOne({name});
    if (!delname) return res.sendStatus(404);
    delname.email = email
    await delname.save();
    res.json({message:"Success"});
})
app.post('/delete',async (req,res) => {
    await user.deleteOne(req.body);
    res.json({message:"Success"});
})

app.get('/users',async(req,res)=>{
    const u =await user.find();
    res.json(u)
})
app.listen(3000,()=>
{
    console.log('http://localhost:3000');
})
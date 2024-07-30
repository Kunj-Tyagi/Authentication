const express=require("express");
const app=express();
const mongoose=require("mongoose");
const User=require("./models/userdetails.js");
const passport=require('./auth');

const MONGO_URL="mongodb://127.0.0.1:27017/Authentication"

main().then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(MONGO_URL);
}

app.use(passport.initialize());

const LocalAuthMiddleware=passport.authenticate('local',{session:false});
app.get("/",LocalAuthMiddleware,function (req,res){
    res.send("Hi,I am root!");
});

app.get("/user",async(req,res)=>{
    let sampleUser=new User({
        email:"tyagi24@gmail.com",
        password:"4567890",
    });

    await sampleUser.save();
    console.log("sample was saved");
    res.send("successful testing!");
});

app.listen(8080,()=>{
    console.log("Server is listening to port 8080");
})
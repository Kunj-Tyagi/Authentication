const ExpressError = require("../middleware/ExpressError.js");
const User = require("../models/user.js");

const signupform=(req,res)=>{
    res.render("./user/signup");
}

const uploadsignup=async(req,res,next)=>{
  try{
      let {username,email,password}=req.body;
      const newUser=new User({email,username});
      const registeredUser=await User.register(newUser,password);
      next(new ExpressError(404, "You have registered!"));
  }
  catch(e){
      next(new ExpressError(404, "You have already registered!"));
  }
}

module.exports={signupform,uploadsignup};
const User=require("./models/userdetails.js");
const passport=require('passport');
const bcrypt=require('bcryptjs');

// Especially design to implement Username and password Authentication.
const LocalStrategy=require('passport-local').Strategy;

passport.use(new LocalStrategy({usernameField:'email'},(async(email,password,done)=>{
    // Authentication Logic here
    try{
        // console.log('Received credentials:',email,password);
        const user=await User.findOne({email:email});
        if(!user)
            return done(null,false,{message:'Incorrect Username'});
        const isPasswordMatch=user.comparePassword(password,user.password);
        if(isPasswordMatch)
            return done(null,user);
        else 
            return done(null,false,{message:'Incorrect Password'});
    }
    catch(err){
        return done(err);
    }
})))

module.exports=passport;// Export configured passport!
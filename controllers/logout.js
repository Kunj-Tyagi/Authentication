const ExpressError = require("../middleware/ExpressError.js");

const loggedout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(new ExpressError(404, "While logout, There is an error."));
        }
        res.redirect("/login");
    })
}

module.exports={loggedout};
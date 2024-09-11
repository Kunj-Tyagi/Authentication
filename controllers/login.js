const loginform=(req,res)=>{
    res.render("./user/login.ejs");
}

const verify=async(req,res)=>{
    res.render("./user/logout.ejs");
}

module.exports={loginform,verify};
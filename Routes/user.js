const express = require("express");
const router = express.Router();
const User=require("../models/user.js");
const passport=require("passport");
const {loginform,verify} =require("../controllers/login.js");
const {signupform,uploadsignup} =require("../controllers/signup.js");
const {loggedout} =require("../controllers/logout.js");

router.get("/signup",signupform);
router.post("/signup",uploadsignup);
router.get("/login",loginform);
router.post("/login",passport.authenticate('local',{failureRedirect:'/login', failureFlash: 'Incorrect username or password.'}),verify);
router.get("/logout",loggedout)

module.exports=router;
// Intialization ka logic:)
const mongoose=require("mongoose");
const initData=require("./data.js");
const User=require("../models/userdetails.js");

// Database name-Authentication
const MONGO_URL="mongodb://127.0.0.1:27017/Authentication";

// main function ko call karna ka liya
main().then(()=>{
    console.log("connected to DB");
}).catch(err=>{
    console.log(err);
});

// for connection between node and mongodb!
async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB=async()=>{
    await User.deleteMany({});
    // initData ki data(object).
    await User.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();
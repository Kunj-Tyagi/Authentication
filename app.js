const express = require("express");
const app = express();
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const ExpressError = require("./middleware/ExpressError.js");
const dotenv = require("dotenv").config(); // load environment variables from .env file

const userRouter = require("./Routes/user.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true })); //To parse data inside request.
app.use(methodOverride("_method")); //method override is npm package:-Jo put and delete request ko send karna mai kaam aati hai.
app.use(express.static(path.join(__dirname, "/public")));
app.engine("ejs", ejsMate);

const MONGO_URL = process.env.URL;

const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.errorMessage = req.flash("error");
  next();
});

app.use("/", userRouter);

app.listen(process.env.PORT, (req, res) => {
  console.log("Happy!");
  // main function ko call karna ka liya
});

app.all("*", (req, res, next) => {
  // Next ka andarr hum error pass karega!!
  next(new ExpressError(404, "Page not found!"));
});

app.use((err, req, res, next) => {
  // Destructure statusCode and message from err, providing defaults
  const statusCode = err.statusCode || 500; // Use err.statusCode if available, otherwise 500
  const message = err.message || "Something went wrong!"; // Use err.message if available
  // Set the status code and render the error view with the message
  res.status(statusCode).render("error", { message });
});

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

// for connection between node and mongodb!
async function main() {
  await mongoose.connect(MONGO_URL);
}

if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}
console.log(process.env.CLOUD_NAME);

const express = require("express");
const app = express();
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const expressError = require("./utilis/expressError.js");
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./Models/user.js");


const mongooseUrl = "mongodb://127.0.0.1:27017/wanderlust";

const sessionOptions = {
    secret: "mysecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date(Date().now + 7 * 24 * 60 * 60 * 1000),
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
}

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(methodOverride('_method'));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

main().then(() => {
    console.log("Connection Successfull");
}).catch((err) => {
    console.log(err);
})
async function main() {
    await mongoose.connect(mongooseUrl);
}

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.curr = req.user;
    next();
})

//Listings Route
app.use("/listings", listingRouter);

//Reviews Route
app.use("/listings/:id/review", reviewRouter);

//Sign Up
app.use("/", userRouter);

//Home route
app.get("/", (req, res) => {
    res.send("Working...");
})

// for all other routs
app.all("*", (req, res, next) => {
    next(new expressError(404, "Page not found"));
})

app.use((err, req, res, next) => {
    console.log("ERROR URL:", req.originalUrl);
    console.log("METHOD:", req.method);
    console.log("ERROR MESSAGE:", err.message);
    console.log("HEADERS SENT:", res.headersSent);

    if (res.headersSent) {
        return next(err);
    }

    let { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render("error.ejs", { message });
})

app.listen(8080, () => {
    console.log("Listening");
})
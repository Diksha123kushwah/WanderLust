if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}
// console.log(process.env.CLOUD_NAME);
// console.log(process.env.MAP_TOKEN);

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
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./Models/user.js");
const apiKeyRoute = require("./routes/listing.js");



// const mongooseUrl = "mongodb://127.0.0.1:27017/wanderlust";
const dbURL = process.env.MONGO_ATLAS_URL;

const store = MongoStore.create({
    mongoUrl: dbURL,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error", () => {
    console.log("ERROR in MONGO SESSION STORE", err);
})

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
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

async function main() {
    await mongoose.connect(dbURL);
}

main().then(() => {
    console.log("Connection Successfull");
}).catch((err) => {
    console.log(err);
})


app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.curr = req.user;
    next();
})
app.get("/", (req, res) => {
    res.send("welcome");
})
//Sign Up
app.use("/", userRouter);

//Listings Route
app.use("/listings", listingRouter);

//Reviews Route
app.use("/listings/:id/review", reviewRouter);


// //due to error 
// app.use("/.well-known", (req, res) => {
//     res.status(204).end(); // No Content
// });

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
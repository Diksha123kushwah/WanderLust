const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");


const sessionOption = { secret: "mysupersecret", resave: false, saveUninitialized: true };
app.use(session(sessionOption));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(flash());

app.get("/register", (req, res) => {
    let { name = "anonymouse" } = req.query;
    req.session.name = name;
    console.log(req.session);
    if (name === "anonymouse") {
        req.flash("error","User not registered");
    } else {
        req.flash("success", "register Successfully");
    }
    res.redirect("/hello");
})
app.get("/hello", (req, res) => {
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    res.render("page.ejs", { name: req.session.name});
})
app.get("/reqcount", (req, res) => {
    if (req.session.count) {
        req.session.count++;
    } else {
        req.session.count = 1;
    }
    res.send(`Request received ${req.session.count} times`);
})

app.get("/test", (req, res) => {
    res.send("Success");
})

// const cookieParser = require("cookie-parser");

// app.use(cookieParser("secretcode"));


// //User
// app.use("/users",users);

// //Posts
// app.use("/posts",posts);

// //verify signed cookies
// app.get("/verify",(req,res)=>{
//     console.dir(req.signedCookies);
//     res.send("Verified");
// })

// app.get("/getsecretcookies",(req,res)=>{
//     res.cookie("surname","kushwah",{signed:true});
//     res.send("Signed cookies sent");
// })

// app.get("/getcookies",(req,res)=>{
//     res.cookie("greet","GoodMorning");
//     res.cookie("madeIn","India");
//     let {name = "anonymouse"} = req.cookies;
//     res.send(`Hii,${name}`);
// })

// app.get("/",(req,res)=>{
//     console.dir(req.cookies);
//     res.send("Home route");
// })

app.listen(3000, () => {
    console.log("Listening at 3000 Port");
})
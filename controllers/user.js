const User = require("../Models/user");

module.exports.signUp = (req, res) => {
    res.render("users/signup.ejs");
}

module.exports.postDataOfSignUp = async (req, res,next) => {
    try {
        let { username, email, password } = req.body;
        let newUser = new User({ email, username });
        let registerUser = await User.register(newUser, password);
        console.log(registerUser);
        req.login(registerUser,(err)=>{
            if(err){
                 next(err);
            }
            req.flash("success", "Welcome To WanderLust");
            res.redirect("/listings");
        })
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
}

module.exports.loginForm = (req, res) => {
    res.render("users/login.ejs");
}

module.exports.postDataOfLogin = async (req, res) => {
   req.flash("success","Welcome To WanderLust");
   let redirectUrl = res.locals.redirectUrl || "/listings";
   res.redirect(redirectUrl);
}

module.exports.logOut = (req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Your Logged Out Successfully!");
        res.redirect("/listings");
    })
}
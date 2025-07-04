const Listing = require("./Models/listing.js");
const Review = require("./Models/review.js");
const expressError = require("./utilis/expressError.js");
const { listingSchema,reviewSchema} = require("./Schema.js");

module.exports.isLoggedIn = (req,res,next)=>{
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You must be logged in!");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req,res,next)=>{
    let { id } = req.params;
    let listing = await Listing.findById(id);
     if(!listing.owner.equals(res.locals.curr._id)){
        req.flash("error","You don't have permission! You are not Owner");
        return res.redirect(`/listings/${id}`); 
    }
    next();
}

module.exports.isReviewAuthor = async (req,res,next)=>{
    let { id, reviewId} = req.params;
    let review = await Review.findById(reviewId);
     if(!review.author.equals(res.locals.curr._id)){
        req.flash("error","You don't have permission! You are not Author of review");
        return res.redirect(`/listings/${id}`); 
    }
    next();
}

module.exports.validateError = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map(el => el.message).join(",");
        throw new expressError(400, errMsg);
    } else {
        next();
    }
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map(el => el.message).join(",");
        throw new expressError(400, errMsg);
    } else {
        next();
    }
}
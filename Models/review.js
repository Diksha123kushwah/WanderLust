const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
    comment: String,
    rating: {
        type: Number,
        max: 5,
        min: 1
    },
    createAt : {
        type : Date,
        default :  Date.now()
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
})
const Review = new mongoose.model("Review",reviewSchema);
module.exports = Review;
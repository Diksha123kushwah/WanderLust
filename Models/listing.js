const mongoose = require("mongoose");
const Review = require("./review.js");
const { listingSchema } = require("../Schema");
listSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        url : String,
        filename : String
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String,
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})
listSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {

        await Review.deleteMany({ _id: { $in: listing.reviews } })
    }
})
let Listing = new mongoose.model("Listing", listSchema);
module.exports = Listing;
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
        type: String,
        default: "https://images.unsplash.com/photo-1703555912608-eb5ea48a9c8c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set: (v) =>
            v === "" ? "https://images.unsplash.com/photo-1619124591285-15d3b26bcca8?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
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
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
})
listSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {

        await Review.deleteMany({ _id: { $in: listing.reviews } })
    }
})
let Listing = new mongoose.model("Listing", listSchema);
module.exports = Listing;
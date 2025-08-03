const mongoose = require("mongoose");
const Review = require("./review.js");
const { listingSchema } = require("../Schema");
// const { coordinates } = require("@maptiler/sdk");
const { required } = require("joi");
listSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        url: String,
        filename: String
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
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    category: {
        type: String,
        enum: [
            "Trending Now", "Beachfront", "Lakefront", "Tiny Homes", "Luxury Villas",
            "Private Rooms", "City Getaways", "Scenic Views", "Farm Stays", "WOW Homes",
            "Mountain Retreats", "Camping & Glamping", "Nature Escapes", "Affordable Stays", "Family Friendly", "Architectural Gems"
        ],
        required: true
    }
})
listSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {

        await Review.deleteMany({ _id: { $in: listing.reviews } })
    }
})
let Listing = new mongoose.model("Listing", listSchema);
module.exports = Listing;
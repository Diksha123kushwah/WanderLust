const Listing = require("../Models/listing.js");
let apiKey = process.env.MAP_TOKEN;


module.exports.index = async (req, res, next) => {
    let allListings = await Listing.find();
    res.render("listings/index.ejs", { allListings });
}

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    } else {
        console.log(listing);
        res.render("listings/show.ejs", { listing });
    }
}

module.exports.createNewListing = (req, res) => {
    res.render("listings/new.ejs");
}

module.exports.postDataToDatabase = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    let newListing = new Listing(req.body.Listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };

    //Geocoding code
    const query = newListing.location;
    const URL = `https://api.maptiler.com/geocoding/${encodeURIComponent(query)}.json?key=${apiKey}`;
    try {
        let response = await fetch(URL);
        let data = await response.json();
        if (data.features.length > 0) {
            const feature = data.features[0];
            newListing.geometry = feature.geometry;
        }
        let savedListing = await newListing.save();
        console.log(savedListing);
        req.flash("success", "New Listing Created!");
        res.redirect("/listings");
    } catch (error) {
        console.error("❌ Error during geocoding or listing save:", err);
        req.flash("error", "Something went wrong. Try again.");
        res.redirect("/listings/new");
    }
}

//filters
module.exports.filterListing = async (req, res) => {
    let { categoryName } = req.params;
    let allListings = await Listing.find({ category: categoryName });
    if (!allListings || allListings.length === 0) {
        req.flash("error", `No listings found in "${categoryName}" category.`);
        return res.redirect("/listings");
    }
    res.render("listings/index.ejs", { allListings, category: categoryName });
}

//Search
module.exports.searchListing = async (req, res) => {
    let { q } = req.query;
    let searchRegex = new RegExp(q, "i");

    let allListings = await Listing.find({
        $or: [
            { title: searchRegex },
            { location: searchRegex },
            { country: searchRegex },
            { category: searchRegex },
            { price: isNaN(q) ? -1 : parseInt(q) } // only match price if number
        ]
    });
    if (!allListings || allListings.length === 0) {
        req.flash("error", `No listings found for "${q}".`);
        return res.redirect("/listings");
    }
    res.render("listings/index.ejs", { allListings });
}

module.exports.editFormListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    } else {
        res.render("listings/edit.ejs", { listing, originalImageUrl });
    }
}

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing not found.");
        return res.redirect("/listings");
    }
    listing.title = req.body.Listing.title;
    listing.price = req.body.Listing.price;
    listing.location = req.body.Listing.location;
    listing.country = req.body.Listing.country;
    listing.category = req.body.Listing.category;
    listing.description = req.body.Listing.description;

    if (req.file) {
        listing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }

    //Geocoding code 
    const query = listing.location;
    const URL = `https://api.maptiler.com/geocoding/${encodeURIComponent(query)}.json?key=${apiKey}`;
    try {
        let response = await fetch(URL);
        let data = await response.json();
        if (data.features.length > 0) {
            const feature = data.features[0];
            listing.geometry = feature.geometry;
        }
        let savedListing = await listing.save();
        console.log(savedListing);
        req.flash("success", "Listing Updated!");
        res.redirect(`/listings/${id}`);
    } catch (error) {
        console.error("❌ Error during geocoding or listing save:", err);
        req.flash("error", "Something went wrong. Try again.");
        res.redirect(`/listings/${id}/edit`);
    }
}

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect(`/listings`);
}
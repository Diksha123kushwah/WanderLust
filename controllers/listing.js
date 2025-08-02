const Listing = require("../Models/listing.js");


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
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
}

module.exports.editFormListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload","/upload/w_250");
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    } else {
        res.render("listings/edit.ejs", { listing, originalImageUrl});
    }
}

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.Listing });
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
}

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");

    res.redirect(`/listings`);
}
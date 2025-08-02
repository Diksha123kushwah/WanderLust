const express = require("express");
const router = express.Router();
const wrapAsync = require("../utilis/wrapAsync.js");
const { isLoggedIn, isOwner, validateError } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage })

router
    .route("/")
    .post(isLoggedIn, upload.single("Listing[image]"), validateError, wrapAsync(listingController.postDataToDatabase))
    .get(wrapAsync(listingController.index));

// Create Listing Route
router.get("/new", isLoggedIn, listingController.createNewListing)

router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, isOwner, upload.single("Listing[image]"), validateError, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

//Edit Form Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editFormListing)) 

module.exports = router;
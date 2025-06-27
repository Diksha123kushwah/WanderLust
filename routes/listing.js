const express = require("express");
const router = express.Router();
const wrapAsync = require("../utilis/wrapAsync.js");
const { isLoggedIn, isOwner, validateError } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

router
    .route("/")
    // .post(isLoggedIn, validateError, wrapAsync(listingController.postDataToDatabase))
    .post(upload.single("Listing[image]"), (req,res)=>{
        res.send(req.body);
    })
    .get(wrapAsync(listingController.index));

// Create Listing Route
router.get("/new", isLoggedIn, listingController.createNewListing)

router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, isOwner, validateError, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

//Edit Form Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editFormListing))    

module.exports = router;
const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utilis/wrapAsync.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controllers/review.js");

//Review add
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.addReview));

//Review Delete
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.deleteReview))

module.exports = router;
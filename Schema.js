const Joi = require('joi');
const listingSchema = Joi.object({
    Listing : Joi.object({
         title: Joi.string().required(),
         description:Joi.string().required(),
         image:Joi.string().allow("",null),
         price:Joi.number().required().min(0),
         location:Joi.string().required(),
         country:Joi.string().required()
    }).required()
});

const reviewSchema = Joi.object({
    review : Joi.object({
        rating : Joi.number().required().max(5).min(1).messages({
            "any.required": "Rating is required",
            "number.base": "Rating must be a number",
            "number.min": "Rating must be at least 1",
            "number.max": "Rating cannot be more than 5"
        }),
        comment : Joi.string().required(),
    }).required()
})

module.exports = {listingSchema,reviewSchema};

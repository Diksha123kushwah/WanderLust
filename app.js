const express = require("express");
const app = express();
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const Listing = require("./Models/listing.js");
const path = require("path");
const methodOverride = require("method-override");

const mongooseUrl = "mongodb://127.0.0.1:27017/wanderlust";

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"))
app.use(methodOverride('_method'));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

main().then(() => {
    console.log("Connection Successfull");
}).catch((err) => {
    console.log(err);
})
async function main() {
    await mongoose.connect(mongooseUrl);
}

//Create Route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
})
app.post("/listings", async (req, res) => {
    let newListing = new Listing(req.body.Listing);
    // let { title, description, price, location, country } = req.body;
    // let newListing = await Listing.insertOne({
    //     title: title,
    //     description: description,
    //     price: price,
    //     location: location,
    //     country: country
    // });
    await newListing.save();
    res.redirect("/listings");
})

//Read Oparetion
app.get("/listings", async (req, res) => {
    let allListings = await Listing.find();
    res.render("listings/index.ejs", { allListings });
})
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
})

//Edit Route
app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
})
app.put("/listings/:id/", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.Listing });
    res.redirect(`/listings/${id}`);
})

//Destroy Route
app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect(`/listings`);
})

//Home route
app.get("/",(req,res)=>{
    res.send("Working...");
})
app.listen(8080, () => {
    console.log("Listening");
})
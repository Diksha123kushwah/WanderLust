const mongoose = require("mongoose");
const listing = require("../Models/listing.js");
const initData = require("./data.js");
const mongooseUrl =  "mongodb://127.0.0.1:27017/wanderlust";
async function main() {
    await mongoose.connect(mongooseUrl);
}
main().then(() => {
    console.log("Connection Successfull");
}).catch((err) => {
    console.log(err);
})
let initDB = async () => {
    await listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj,owner : "6856a415d51b1831f11dba43"}));
    await listing.insertMany(initData.data);
    console.log("data was initilized");
}
initDB();
const express = require("express");
const mongoose = require("mongoose");
const app = express()
const cors = require('cors')
const bcrypt = require('bcrypt');
const dotenv = require('dotenv')
const axios = require('axios')

dotenv.config()

// enable access to all origins
app.use(cors())

// allows for req.body to get Axios POST data
app.use(express.json())

main().catch(err => console.log(err))

// connect to mongoDB database
async function main() {
    mongoose.connect("mongodb://127.0.0.1:27017/trip_db")
}

/* ***************** SCHEMAS AND MODELS ***************** */

/* USER SCHEMA AND MODEL */
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    num_likes: Number
})

// create user model
const User = mongoose.model("User", userSchema)

/* TRIP SCHEMA AND MODEL */
const tripSchema = new mongoose.Schema({
    location: String,
    hotel: String,
    total_price: Number,
    budget: Number,
    num_likes: Number,

    // list of days in the trip
    days: [{
        attraction: String,
        food1: String,
        food2: String,
        daily_budget: Number,
        miles_traveled: Number
    }]
})    

// create trip model
const Trip = mongoose.model("Trip", tripSchema)

/* ***************** API ENDPOINTS ***************** */

// test home route
app.get("/", function(req, res) {
    res.send("Hello World!")
})

app.listen(8000, function(req, res) {
    console.log("Listening on port 8000")
})
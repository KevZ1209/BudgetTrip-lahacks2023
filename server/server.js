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
    // local connection string: "mongodb://127.0.0.1:27017/trips_db"
    mongoose.connect("mongodb+srv://lahackers:pass@easyrideone.0gqx4ay.mongodb.net/trips_db?retryWrites=true&w=majority")
}

/* ***************** SCHEMAS AND MODELS ***************** */

/* USER SCHEMA AND MODEL */
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    // num_likes is a number, originally set to 0
    num_likes: {
        type: Number,
        default: 0
    }
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

// create user
app.post("/create-user", async function(req, res) {
    // get username and password from req.body
    const { username, password, name } = req.body

    console.log(username, password, name)

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // create new user
    const newUser = new User({
        username: username,
        password: hashedPassword,
        name: name,
        num_likes: 0 
    })

    // save new user to database
    try {
        let foundUser = await User.findOne({username: username})
        if (foundUser == null) {
            try {
                await newUser.save()
                res.send(true)
            } catch (error) {
                res.send(error)
            }
        }
        else {
            res.send(false)
        }
        
    }
    catch (error) {
        res.send(error)
    }
})

app.post("/login", async function(req, res) {
    // get username and password from req.body
    const { username, password } = req.body

    // check if user exists
    const user = await User.findOne({username: username})

    if (user) {
        // check if password matches
        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            res.send("Success")
        } else {
            res.send("Incorrect password")
        }
    } else {
        res.send("User does not exist")
    }

})

app.listen(8000, function(req, res) {
    console.log("Listening on port 8000")
})
const express = require("express");
const mongoose = require("mongoose");
const app = express()
const cors = require('cors')
const bcrypt = require('bcrypt');
const dotenv = require('dotenv')
const axios = require('axios')

/* other imported files: */
const services = require('./services.js')
const algorithm = require('./algorithm.js')

// algorithm.tripListMaker(hotels,restaurants,attractions,budget,num_days)

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
    },
    // array of trip ID's of trips liked by user
    trips_liked: [String]

})

// create user model
const User = mongoose.model("User", userSchema)

/* TRIP SCHEMA AND MODEL */
const tripSchema = new mongoose.Schema({
    username: String,
    location: String,
    hotel: String,
    total_price: Number,
    budget: Number,
    num_likes: Number,
    // theme_park: Boolean, // optional filters below
    // museum: String, 
    // national_park: String,
    // max_distance_from_hotel: Number,

    // list of days in the trip
    days: [{
        attraction: String,
        food1: String,
        food2: String,
        daily_price: Number,
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
        username,
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
            res.send(true)
        } else {
            res.send(false)
        }
    } else {
        res.send(null)
    }

})

app.get("/get-user-data", async function(req, res) {
    // get username from req.body
    const { username } = req.query
    // find trips for user
    const user = await User.findOne({username: username});
    console.log("user***", user)
    res.send({name: user.name, num_likes: user.num_likes, trips_liked: user.trips_liked})

})

app.post("/create-trip", async function(req, res) {
    // get data from req.body
    const { username, location, hotel, budget, days, total_price } = req.body

    // create new trip
    const newTrip = new Trip({
        username,
        location,
        hotel,
        total_price,
        budget,
        total_price: 0,
        num_likes: 0,
        days
    })

    attraction_string = `Attractions in ${location}`
    restaurant_string = `Restaurants in ${location}`

    // save new trip to database
    try {
        await newTrip.save()
        res.send(newTrip)
    } catch (error) {
        res.send(error)
    }

})

app.get("/view-trips-for-user", async function(req, res) {
    // get username from req.body
    const { username } = req.query

    // find trips for user
    const trips = await Trip.find({username: username})
    console.log(await Trip.find({}))

    res.send(trips)

})

// view all trips for the feed
app.get("/view-all-trips", async function(req, res) {
    // find all trips
    const trips = await Trip.find({})
    console.log(trips)
    res.send(trips)
})

app.get("/view-days-for-trip", async function(req, res) {
    // get tripID from req.body
    const { tripID } = req.body

    // find trip given tripID
    const foundTrip = await Trip.findOne({_id: tripID})
    
    if (foundTrip == null) {
        // no triip with that tripID
        res.send(null)
    }
    else {
        // get days for foundTrip
        const days = foundTrip.days

        res.send(days)
    }
})

app.post("/like-trip", async function(req, res) {

    // username -> user that liked the trip
    // tripID -> trip that was liked
    const { username, tripID } = req.body

    // important note: `trip.username` is the username of the trip that was liked. `username` is the user that liked the trip!

    // find trip and update num_likes
    let trip = await Trip.findOneAndUpdate({_id: tripID}, {$inc: {num_likes: 1}}, {new: true})
    
    // increment user's num_likes
    await User.findOneAndUpdate({username: trip.username}, {$inc: {num_likes: 1}}, {new: true})

    // update user's trips_liked array
    const user = await User.findOneAndUpdate({username: username}, {$push: {trips_liked: tripID}}, {new: true})

    if (trip == null) {
        // no trip with that trip ID
        res.send(null)
    }
    else {
        // success!
        console.log("TRIP:")
        console.log(trip)
        console.log("USER:")
        console.log(user)
        res.send(true)
    }
})

app.post("/unlike-trip", async function(req, res) {

    const { username, tripID } = req.body

    // find trip and update num_likes
    let trip = await Trip.findOneAndUpdate({_id: tripID}, {$inc: {num_likes: -1}}, {new: true})

    // decrement user's num_likes
    await User.findOneAndUpdate({username: trip.username}, {$inc: {num_likes: -1}}, {new: true})

    // update user's trips_liked array
    const user = await User.findOneAndUpdate({username: username}, {$pull: {trips_liked: tripID}}, {new: true})

    if (trip == null) {
        // no trip with that trip ID
        res.send(null)
    }
    else {
        // success!
        console.log("TRIP:")
        console.log(trip)
        console.log("USER:")
        console.log(user)
        res.send(true)
    }
})

app.get("/test-hotels/:location", async function(req, res) {
    // get location from req.params
    const { location } = req.params

    // get hotels from services.js
    const hotels = await services.get_hotels(location)

    res.send(hotels)
})

app.get("/test-attractions/:location", async function(req, res) {
    // get location from req.params
    const { location } = req.params

    // get attractions from services.js
    const attractions = await services.get_attractions(location, "Attractions")

    res.send(attractions)
})

app.get("/test-restaurants/:location", async function(req, res) {
    // get location from req.params
    const { location } = req.params

    // get restaurants from services.js
    const restaurants = await services.get_restaurants(location)

    res.send(restaurants)
})

// THIS FUNCTION IS NOT FINISHED!!!
app.get("/generate-trip", async function(req, res) {
    // get location from req.params

    
    let { location, budget, num_days, max_travel_distance_per_day, amusement_park, aquarium, zoo, museum, park, shopping_mall, store } = req.body

    // cast to ints
    budget = parseInt(budget)
    num_days = parseInt(num_days)
    max_travel_distance_per_day = parseInt(max_travel_distance_per_day)

    // get hotels from services.js
    const hotels = await services.get_hotels(location)
    // console.log(hotels)

    // get attractions from services.js
    let amusement_parks = []
    let museums = []
    let parks = []
    let shopping_malls = []
    let stores = []
    let zoos = []
    let aquariums = []
    
    let general_attractions = await services.get_attractions(location, "attractions")
    
    if (amusement_park === 'true') {
        amusement_parks = await services.get_attractions(location, "amusement parks")
    }
    if (museum === 'true') {
        museums = await services.get_attractions(location, "museums")
    }  
    if (park === 'true') {
        parks = await services.get_attractions(location, "parks")
    }
    if (shopping_mall === 'true') {
        shopping_malls = await services.get_attractions(location, "shopping malls")
    }
    if (store === 'true') {
        stores = await services.get_attractions(location, "stores")
    }
    if (zoo === 'true') {
        zoos = await services.get_attractions(location, "zoos")
    }
    if (aquarium === 'true') {
        aquariums = await services.get_attractions(location, "aquariums")
    }

    // combine all attraction arrays into a single array using spread operator
    let attractions = [...general_attractions, ...amusement_parks, ...museums, ...parks, ...shopping_malls, ...stores, ...zoos, ...aquariums]
    
    // remove duplicate attractions if they have same name
    let unique_attractions = []
    for (let i = 0; i < attractions.length; i++) {
        if (unique_attractions.findIndex(x => x.name === attractions[i].name) === -1) {
            unique_attractions.push(attractions[i])
        }
    }

    // console.log(unique_attractions)

    // get restaurants from services.js
    const restaurants = await services.get_restaurants(location)
    // console.log(restaurants)

    // console.log(attractions)

    const trip = await algorithm.tripListMaker(hotels,unique_attractions,restaurants,budget,num_days, max_travel_distance_per_day, amusement_park, museum, park, shopping_mall, store, zoo, aquarium, 1)

    res.send(trip)
    
    // generate a trip using algorithm
    

    // res.send(trip)

})


app.listen(8000, function(req, res) {
    console.log("Listening on port 8000")
})
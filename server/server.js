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


app.listen(8000, function(req, res) {
    console.log("Listening on port 8000")
})
const axios = require('axios');

const prices = require('./prices.js');

const hotel_prices = prices.hotel_prices
const attractions_prices = prices.attractions_prices
const restaurants_price_ladder = prices.restaurants_price_ladder

async function get_hotels(city) {
    let google_places_api_endpoint = "https://maps.googleapis.com/maps/api/place/textsearch/json?";
    let google_places_api_key = "AIzaSyDGrrBMexF85xA4aBVabFBFv9DqSl8lutQ";
    let query = "Hotels" + " in " + city;

    let final_endpoint  = google_places_api_endpoint + "query=" + query + "&key=" + google_places_api_key;

    const all_hotels = [];
    const only_names = [];
    const filtered_hotels = [];

    const response = await axios.get(final_endpoint);
    let raw_data = response.data.results;
    for (let i = 0; i < raw_data.length; i++) {
        
        let new_object = {}
        new_object.name = raw_data[i].name;
        new_object.rating = raw_data[i].rating;
        new_object.address = raw_data[i].formatted_address;
        if ((raw_data[i]).hasOwnProperty('photos') === true) {
            new_object.photo_reference = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + raw_data[i].photos[0].photo_reference  + '&key=' + google_places_api_key;
        }
        else {
            new_object.photo_reference = "https://static.nationalgeographic.co.uk/files/styles/image_3200/public/reine-autumn-4.jpg?w=400&h=400&q=75"
        }
        new_object.place_id = raw_data[i].place_id;
        new_object.num_ratings = raw_data[i].user_ratings_total;
        
        only_names.push(raw_data[i].name);
        all_hotels.push(new_object);
    }

    for (let i = 0; i < only_names.length; i++) {
        // if current hotel's name contains a name in hotel_prices, add it to filtered_hotels
        let current_hotel = only_names[i];
        for (let j = 0; j < hotel_prices.length; j++) {
            if (current_hotel.includes(hotel_prices[j].name)) {
                // add in price value for that hotel to each filtered hotel

                filtered_hotels.push(all_hotels[i]);
                filtered_hotels[filtered_hotels.length - 1].price = hotel_prices[j].average_cost_per_night;

            }
            
        }

    }

    // console.log(filtered_hotels);
    // console.log(result_array);
    return filtered_hotels;
}

async function get_restaurants(city) {
    let google_places_api_endpoint = "https://maps.googleapis.com/maps/api/place/textsearch/json?";
    let google_places_api_key = "AIzaSyDGrrBMexF85xA4aBVabFBFv9DqSl8lutQ";
    let query = "Restaurants" + " in " + city;

    let final_endpoint  = google_places_api_endpoint + "query=" + query + "&key=" + google_places_api_key;

    const all_restaurants = [];

    const response = await axios.get(final_endpoint);
    let raw_data = response.data.results;
    for (let i = 0; i < raw_data.length; i++) {
        
        let new_object = {}
        new_object.name = raw_data[i].name;
        new_object.rating = raw_data[i].rating;
        new_object.address = raw_data[i].formatted_address;
        if ((raw_data[i]).hasOwnProperty('photos') === true) {
            new_object.photo_reference = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + raw_data[i].photos[0].photo_reference  + '&key=' + google_places_api_key;
        }
        else {
            new_object.photo_reference = "https://static.nationalgeographic.co.uk/files/styles/image_3200/public/reine-autumn-4.jpg?w=400&h=400&q=75"
        }
        new_object.place_id = raw_data[i].place_id;
        new_object.price = restaurants_price_ladder[raw_data[i].price_level - 1];
        new_object.num_ratings = raw_data[i].user_ratings_total;
        
        // if new_object.price is NaN, continue...
        if (isNaN(new_object.price)) {
            continue;
        }

        all_restaurants.push(new_object);
    }

    // console.log(all_restaurants);

    return all_restaurants;
}

async function get_attractions(city, attraction_type) {
    let google_places_api_endpoint = "https://maps.googleapis.com/maps/api/place/textsearch/json?";
    let google_places_api_key = "AIzaSyDGrrBMexF85xA4aBVabFBFv9DqSl8lutQ";
    let query = attraction_type + " in " + city;

    let final_endpoint  = google_places_api_endpoint + "query=" + query + "&key=" + google_places_api_key;

    const all_attractions = [];

    const response = await axios.get(final_endpoint);
    let raw_data = response.data.results;
    for (let i = 0; i < raw_data.length; i++) {
        
        let new_object = {}
        new_object.name = raw_data[i].name;
        new_object.rating = raw_data[i].rating;
        new_object.address = raw_data[i].formatted_address;
        // new_object.photo_reference = raw_data[i].photos[0].photo_reference;
        new_object.place_id = raw_data[i].place_id;
        new_object.num_ratings = raw_data[i].user_ratings_total;
        new_object.categories = raw_data[i].types;
        
        if ((raw_data[i]).hasOwnProperty('photos') === true) {
            new_object.photo_reference = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + raw_data[i].photos[0].photo_reference  + '&key=' + google_places_api_key;
        }
        else {
            new_object.photo_reference = "https://static.nationalgeographic.co.uk/files/styles/image_3200/public/reine-autumn-4.jpg?w=400&h=400&q=75"
        }
        let attraction_types = raw_data[i].types;

        // console.log(new_object.name);
        // console.log(attraction_types);
        // if attraction_types contains one of the attraction types in attractions_prices, add it. 
        // otherwise, set default price to 0
        
        // default value
        new_object.price = 0;
        for (let j = 0; j < attraction_types.length; j++) {
            for (let k = 0; k < attractions_prices.length; k++) {
                // console.log("attraction types: " + attraction_types[j])
                // console.log("attractions prices: " + attractions_prices[k].activity)
                if (attraction_types[j] == attractions_prices[k].activity) {
                    if (attractions_prices[k].price > new_object.price) {
                    new_object.price = attractions_prices[k].price;
                    }
                }
            }
        }
        
        all_attractions.push(new_object);
    }

    // console.log(all_attractions);
    return all_attractions;
}

// get_hotels("Los Angeles");
get_attractions("Los Angeles");


/* export all functions*/
module.exports = {
    get_hotels,
    get_restaurants,
    get_attractions
}
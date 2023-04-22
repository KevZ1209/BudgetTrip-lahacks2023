let dollar_per_mile = 0.65;

let type_constants = {
  lodging: 125,
  musuem: 12.5,
  park: 0,
  restaurant: 10,
  theme_park: 50,
};

const trips_parameter_dummy = {
  num_days: 2, // 1: attractions, 2: restaurants
  budget: 500,
  activities: [
    {
      name: "Universal Studios",
      price: 1,
      rating: 4.3,
      num_ratings: 1000,
    },
    {
      name: "Disneyland",
      price: 2,
      rating: 4.2,
      num_ratings: 800,
    },
    {
      name: "Six Flags",
      price: 3,
      rating: 4.1,
      num_ratings: 600,
    },
  ],
  restaurants: [
    {
      name: "McDonalds",
      price: 1,
      rating: 4.3,
    },
    {
      name: "Burger King",
      price: 2,
      rating: 4.2,
    },
    {
      name: "Wendys",
      price: 3,
      rating: 4.1,
    },
    {
      name: "In-N-Out",
      price: 4,
      rating: 4.0,
    },
    {
      name: "Chick-Fil-A",
      price: 1,
      rating: 3.9,
    },
  ],
  hotels: [
    {
      name: "Holiday Inn",
      price: 1,
      rating: 4.3,
    },
    {
      name: "Marriott",
      price: 2,
      rating: 4.2,
    },
    {
      name: "Hilton",
      price: 3,
      rating: 4.1,
    },
  ],
};

const return_trip_dummy = {
  trip_price: 500,
  budget: 500,
  total_distance_traveled: 120,
  hotel: "Holiday Inn",
  price_per_night: 100,
  days: [
    {
      attraction: {
        name: "Universal Studios",
        price: 100,
        rating: 4.3,
        activity_distance: 20,
      },
      restaurant_1: {
        name: "McDonalds",
        price: 10,
        rating: 4.3,
        activity_distance: 30,
      },
      restaurant_2: {
        name: "Burger King",
        price: 20,
        rating: 4.2,
        activity_distance: 10,
      },

      total_day_price: 150,
      miles_traveled: 60,
    },
    {
      attraction: {
        name: "Disneyland",
        price: 100,
        rating: 4.3,
        activity_distance: 20,
      },
      restaurant_1: {
        name: "Wendys",
        price: 10,
        rating: 4.3,
        activity_distance: 30,
      },
      restaurant_2: {
        name: "In-N-Out",
        price: 20,
        rating: 4.2,
        activity_distance: 10,
      },
      total_day_price: 110,
      miles_traveled: 40,
    },
  ],
};

const tripListMaker = (trips) => {};

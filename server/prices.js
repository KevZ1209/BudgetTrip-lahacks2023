const hotel_prices = [
  {
    name: "Hilton",
    average_cost_per_night: 170,
  },
  {
    name: "Marriott",
    average_cost_per_night: 220,
  },
  {
    name: "Sheraton",
    average_cost_per_night: 210,
  },
  {
    name: "Hyatt",
    average_cost_per_night: 180,
  },
  {
    name: "Intercontinental",
    average_cost_per_night: 140,
  },
  {
    name: "Radisson",
    average_cost_per_night: 190,
  },
  {
    name: "Best Western",
    average_cost_per_night: 130,
  },
  {
    name: "Holiday Inn",
    average_cost_per_night: 120,
  },
  {
    name: "Motel 6",
    average_cost_per_night: 90,
  },
  {
    name: "Super 8",
    average_cost_per_night: 70,
  },
];

const attractions_prices = [
  {
    activity: "amusement_park",
    price: 100,
  },
  {
    activity: "aquarium",
    price: 60,
  },
  {
    activity: "zoo",
    price: 40,
  },
  {
    activity: "museum",
    price: 25,
  },
  {
    activity: "park",
    price: 0,
  },
  {
    activity: "shopping_mall",
    price: 0,
  },
  {
    activity: "store",
    price: 0,
  },
];

const restaurants_price_ladder = [12.5, 25, 50, 100];

module.exports = {
  hotel_prices: hotel_prices,
  attractions_prices: attractions_prices,
  restaurants_price_ladder: restaurants_price_ladder,
};

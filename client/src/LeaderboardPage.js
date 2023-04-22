import React from "react";
import { useState } from 'react';
import ItineraryCard from "./ItineraryCard";
import { MdAttractions, MdOutlineFastfood } from 'react-icons/md';
import "./LeaderboardPage.css";
import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, ButtonGroup, Button, Flex, Avatar, Box, IconButton, Link, UnorderedList, ListItem, ListIcon } from '@chakra-ui/react';
import { VStack } from "@chakra-ui/react";
import { Icon, CheckIcon, CalendarIcon, HamburgerIcon } from '@chakra-ui/icons'

function LeaderboardPage() {
    const userList = [
        {
            username: "Marcus Cheng",
            location: "Cleveland",
            hotel: "Motel 6",
            total_price: 7278,
            budget: 9341,
            num_likes: 69,
            hotel_price: 384,
            total_distance: 2023,
            days: [{
                attraction: "Some Bridge",
                food1: "The Worst Restaurant",
                food2: "Canes",
                daily_price: 3421,
                miles_traveled: 420,
            },
            {
                attraction: "The Best Park in Cleveland",
                food1: "Food Truck 21",
                food2: "Taco Bell",
                daily_price: 3429,
                miles_traveled: 81,
            },
            ]
        },
        {
            username: "Joe Bruin",
            location: "Mexico City",
            hotel: "Motel 7",
            total_price: 3478,
            budget: 4823,
            num_likes: 421,
            hotel_price: 456,
            total_distance: 1984,
            days: [{
                attraction: "Antropology Museum",
                food1: "Tacos 1986",
                food2: "Taco Bell",
                daily_price: 1243,
                miles_traveled: 75,
            },
            {
                attraction: "Aztec Pyramids",
                food1: "Food Truck 22",
                food2: "Del Taco",
                daily_price: 2110,
                miles_traveled: 72,
            },
            ]
        },
    ];
    const [itinerary, setItinerary] = useState([false, true]);
    
    function changeItinerary(value, index) {
        let newArray = [];
        for(let i = 0; i < userList.length; i++) {
          if(i === index) {
            newArray.push(value);
          } else {
            newArray.push(itinerary[i]);
          }
        }
        setItinerary(newArray);
    }

    return (
    <VStack spacing={10}  paddingTop="30px">
    <Heading>Feed</Heading>
    {userList.map((user,index) => (
        <ItineraryCard name={user.username} location={user.location} budget={user.budget} total_price={user.total_price} likes={user.num_likes} days={user.days} hotel={user.hotel} hotel_price={user.hotel_price} includeLikes={true} num={index}  total_distance={user.total_distance}/>
      ))}
    </VStack>
    );
}


export default LeaderboardPage;
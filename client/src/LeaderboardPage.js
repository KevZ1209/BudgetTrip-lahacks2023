import React from "react";
import { useState } from 'react';
import ItineraryCard from "./ItineraryCard";
import { MdOutlineArrowUpward, MdOutlineArrowDownward } from 'react-icons/md';
import "./LeaderboardPage.css";
import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, ButtonGroup, Button, Flex, Avatar, Box, IconButton, Link, UnorderedList, ListItem, ListIcon, Select } from '@chakra-ui/react';
import { Icon, CheckIcon, CalendarIcon, HamburgerIcon } from '@chakra-ui/icons'
import {VStack, HStack } from '@chakra-ui/react';
import { MdOutlineFeed } from 'react-icons/md'

function LeaderboardPage() {
    const [userList, setUserList] = useState([
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
    ]);
    const [sortType,setSortType] = useState("");
    const [ascending,setAscending] = useState(false);
    
    function sortBy(prop, ascending) {
        console.log(prop);
        console.log(ascending);
        let sorted;
        setSortType(prop);
        setAscending(ascending);
        if(ascending) {
            sorted = [...userList].sort((a,b) => a[prop] - b[prop]);
        } else {
            sorted = [...userList].sort((a,b) => b[prop] - a[prop]);
        }
        setUserList(sorted);
    }

    return (
    <VStack spacing={10} paddingTop="30px">
        <HStack>
        <Icon w={10} h={10} as={MdOutlineFeed}/>
        <Heading>Feed</Heading>
      </HStack>
    <HStack width="512px">
    <Select placeholder='Sort by' width="100%" iconColor="black" backgroundColor="white" textColor="black" onChange={(e) => sortBy(e.target.value, ascending)}>
        <option value='num_likes'>Likes</option>
        <option value='total_price'>Money</option>
        <option value='total_distance'>Distance</option>
    </Select>
    {sortType !== "" && <Button backgroundColor="white" _hover="brand.100" onClick={() => {sortBy(sortType,!ascending)}}>{!ascending && <Icon as={MdOutlineArrowUpward} color="black"/>}{ascending && <Icon as={MdOutlineArrowDownward} color="black" />}</Button>}
    </HStack>
    {userList.map((user,index) => (
        <ItineraryCard name={user.username} location={user.location} budget={user.budget} total_price={user.total_price} likes={user.num_likes} days={user.days} hotel={user.hotel} hotel_price={user.hotel_price} includeLikes={true} num={index}  total_distance={user.total_distance}/>
      ))}
    </VStack>
    );
}


export default LeaderboardPage;
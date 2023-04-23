import React from "react";
import { useState, useEffect, useContext } from 'react';
import ItineraryCard from "./ItineraryCard";
import { MdOutlineArrowUpward, MdOutlineArrowDownward } from 'react-icons/md';
import "./LeaderboardPage.css";
import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, ButtonGroup, Button, Flex, Avatar, Box, IconButton, Link, UnorderedList, ListItem, ListIcon, Select } from '@chakra-ui/react';
import { Icon, CheckIcon, CalendarIcon, HamburgerIcon } from '@chakra-ui/icons'
import {VStack, HStack } from '@chakra-ui/react';
import { MdOutlineFeed } from 'react-icons/md'
import UserContext from "./UserContext";
import axios from "axios";

function LeaderboardPage() {
    const { currentUsername } = useContext(UserContext);
    const [trips, setTrips] = useState([])
    const [sortType,setSortType] = useState("");
    const [ascending,setAscending] = useState(false);
    const [tripsLiked,setTripsLiked] = useState([]);
    
    function sortBy(prop, ascending) {
        console.log(prop);
        console.log(ascending);
        let sorted;
        setSortType(prop);
        setAscending(ascending);
        if(ascending) {
            sorted = [...trips].sort((a,b) => a[prop] - b[prop]);
        } else {
            sorted = [...trips].sort((a,b) => b[prop] - a[prop]);
        }
        setTrips(sorted);
    }

    useEffect(() => {
        async function fetchData() {
            const result = await axios.get("http://localhost:8000/view-all-trips")
            if(result){
                setTrips(result.data)
            }
        }
        fetchData();
        
    },[])

    useEffect(() => {
        async function fetchData() {
            const result = await axios.get("http://localhost:8000/get-user-data", {
                params: {
                    username: currentUsername
                }
            })
            console.log(result.data)
            if(result){
                setTripsLiked(result.data.trips_liked)
                console.log("tripsLiked", tripsLiked)
            }
        }
        fetchData();
        
    },[])

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
    {trips.map((trip,index) => (
        <ItineraryCard name={trip.username} tripID={trip._id} location={trip.location} budget={trip.budget} total_price={trip.total_price} likes={trip.num_likes} days={trip.days} hotel={trip.hotel} hotel_price={trip.hotel_price} includeLikes={true} num={index}  total_distance={trip.total_distance} setTrips={setTrips} trips={trips} liked={tripsLiked.includes(trip._id)} currentUsername={currentUsername}/>
      ))}
    </VStack>
    );
}


export default LeaderboardPage;
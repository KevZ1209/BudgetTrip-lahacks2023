import React, { useEffect, useContext, useState } from "react";
import { VStack, Card, Heading, Table, Tr, Tbody, Td, HStack } from '@chakra-ui/react'
import "./ProfilePage.css";
import ItineraryCard from "./ItineraryCard";
import { Icon } from '@chakra-ui/icons'
import { MdPerson } from 'react-icons/md'
import UserContext from "./UserContext";
import axios from "axios";

function ProfilePage() {
    const { currentUsername, setCurrentUsername } = useContext(UserContext);
    const [name, setName] = useState("...");
    const [numLikes, setNumLikes] = useState("...");
    const [trips, setTrips] = useState([])

    const user = {
        name: "Marcus Cheng",
        username: "marcuscheng123",
        totalLikes: 69420,
    }
    
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



    useEffect(() => {
        async function fetchData() {
            const result = await axios.get("http://localhost:8000/get-user-data", {
                params: {
                    username: currentUsername
                }
            })
            console.log("....",result)
            if(result){
                setNumLikes(result.data.num_likes)
                setName(result.data.name)
            }
        }
        fetchData();
        
    },[])

    useEffect(() => {
        async function fetchData() {
            const result = await axios.get("http://localhost:8000/view-trips-for-user", {
                params: {
                    username: currentUsername
                }
            })
            if(result){
                setTrips(result.data)
            }
        }
        fetchData();
        
    },[])



    return (
    <VStack spacing={10} paddingTop="30px">
        <HStack>
            <Icon w={10} h={10} as={MdPerson}/>
            <Heading>Profile</Heading>
        </HStack>
            <Card width='512px'>
              <Table>
                <Tbody>
                    <Tr>
                        <Td>
                            Name
                        </Td>
                        <Td>
                            {name}
                        </Td>
                    </Tr>
                    <Tr>
                        <Td>
                            Username
                        </Td>
                        <Td>
                            {currentUsername}
                        </Td>
                    </Tr>
                    <Tr>
                        <Td>
                            Total Number of Likes
                        </Td>
                        <Td>
                            {numLikes}
                        </Td>
                    </Tr>
                </Tbody>
              </Table>
            </Card>
            <Heading fontSize="2xl">Your Trips</Heading>
            {trips.map((trip,index) => (
        <ItineraryCard name={currentUsername} location={trip.location} budget={trip.budget} total_price={trip.total_price} likes={trip.num_likes} days={trip.days} hotel={trip.hotel} hotel_price={trip.hotel_price} includeLikes={false} num={index} total_distance={trip.total_distance}/>
      ))}
    </VStack>
    );
}

export default ProfilePage;
import React, { useEffect, useContext, useState } from "react";
import { VStack, Card, Heading, Table, Tr, Tbody, Td, HStack } from '@chakra-ui/react'
import "./ProfilePage.css";
import ItineraryCard from "./ItineraryCard";
import { Icon } from '@chakra-ui/icons'
import { MdPerson } from 'react-icons/md'
import UserContext from "./UserContext";
import axios from "axios";

function ProfilePage() {
    const { currentUsername } = useContext(UserContext);
    const [name, setName] = useState("...");
    const [numLikes, setNumLikes] = useState("...");
    const [trips, setTrips] = useState([])



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
        <ItineraryCard name={currentUsername} location={trip.location} budget={trip.budget} total_price={trip.total_price} likes={trip.num_likes} days={trip.days} hotel={trip.hotel} hotel_price={trip.hotel_price} includeLikes={false} num={index} total_distance={trip.total_distance} photo_reference={trip.photo_reference}/>
      ))}
    </VStack>
    );
}

export default ProfilePage;
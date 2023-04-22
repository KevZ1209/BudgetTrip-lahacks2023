import React from "react";
import { useState } from 'react';
import "./LeaderboardPage.css";
import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, ButtonGroup, Button, Flex, Avatar, Box, IconButton, Link, UnorderedList, ListItem, ListIcon } from '@chakra-ui/react';
import { VStack } from "@chakra-ui/react";
import { CheckIcon, CalendarIcon, HamburgerIcon } from '@chakra-ui/icons'

function LeaderboardPage() {
    const userList = [
        {
            location: "Cleveland",
            hotel: "Motel 6",
            total_price: 7278,
            budget: 9341,
            num_likes: 69,
            days: [{
                attraction: "Some Bridge",
                food1: "The Worst Restaurant",
                food2: "Canes",
                daily_budget: 3421,
                miles_traveled: 420,
            },
            {
                attraction: "The Best Park in Cleveland",
                food1: "Food Truck 21",
                food2: "Taco Bell",
                daily_budget: 3429,
                miles_traveled: 81,
            },
            ]
        },
        {
            location: "Mexico City",
            hotel: "Motel 7",
            total_price: 3478,
            budget: 4823,
            num_likes: 421,
            days: [{
                attraction: "Antropology Museum",
                food1: "Tacos 1986",
                food2: "Taco Bell",
                daily_budget: 1243,
                miles_traveled: 75,
            },
            {
                attraction: "Aztec Pyramids",
                food1: "Food Truck 22",
                food2: "Del Taco",
                daily_budget: 2110,
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
    <div id="leaderboard">
    <VStack spacing={10}>
    {userList.map((user,index) => (
        <Card maxW='lg' key={index}>
            <CardHeader>
                <Flex spacing='4'>
                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                    <Box>
                    <Heading size='md'>{user.location}</Heading>
                    <Text>{user.location}</Text>
                    </Box>
                </Flex>
                <Button flex='1' variant='ghost' leftIcon={<CheckIcon />}>
                Like
                </Button>
                </Flex>
            </CardHeader>
            <Image
                objectFit='cover'
                src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                alt='Chakra UI'
            />
            <CardBody>
                <Text>
                Total Price: ${user.total_price}
                </Text>
                <Text>
                Budget: ${user.budget}
                </Text>
            </CardBody>
            <CardFooter
                justify='space-between'
                flexWrap='wrap'
                sx={{
                '& > button': {
                    minW: '136px',
                },
                }}
            >
            <VStack>
            {itinerary[index] === true && <Text>
                <Heading size='lg' marginBottom="3">
                    Itinerary
                </Heading>
                <Divider />
                <Heading size='sm' marginBottom="3" marginTop="3">
                    Hotel: {user.hotel}
                </Heading>
                <Divider />
                {user.days.map((day,num) => (
                <>
                <Heading size='sm' marginTop="2" marginBottom="2">
                    Day {num+1}:
                </Heading>
                <UnorderedList spacing={3}>
                    <ListItem>
                        <ListIcon as={CalendarIcon} color='green.500' />
                        Activity: {day.attraction}
                    </ListItem>
                    <ListItem>
                        <ListIcon as={HamburgerIcon} color='green.500' />
                        Lunch: {day.food1}
                    </ListItem>
                    <ListItem>
                        <ListIcon as={HamburgerIcon} color='green.500' />
                        Dinner: {day.food2}
                    </ListItem>
                </UnorderedList>
                <Text marginTop="2" marginBottom="2">
                    Money Spent: ${day.daily_budget}
                </Text>
                </>
                ))}
                
                <Divider />
            </Text>}
            <Text>
            {itinerary[index] === false && <Link color='teal.500' href='#' onClick={() => {changeItinerary(true, index)}}>
                View Itinerary
            </Link>}
            {itinerary[index] === true && <Link color='teal.500' href='#' onClick={() => {changeItinerary(false, index)}}>
                Close Itinerary
            </Link>}
            </Text>
            </VStack>
            </CardFooter>
            </Card>
      ))}
    </VStack>
      
        
    </div>
    );
}


export default LeaderboardPage;
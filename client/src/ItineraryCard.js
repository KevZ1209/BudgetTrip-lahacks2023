import React from "react";
import { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, ButtonGroup, Button, Flex, Avatar, Box, IconButton, Link, UnorderedList, ListItem, ListIcon, VStack, HStack } from '@chakra-ui/react';
import { Icon, CheckIcon, } from '@chakra-ui/icons';
import { MdAttractions, MdOutlineFastfood, MdOutlineThumbUpOffAlt } from 'react-icons/md';
import "./ProfilePage.css";

function ItineraryCard(props) {

    const [itinerary, setItinerary] = useState(false);
    const [liked, setLiked] = useState(false);
    
    return (
    <div id="itineraryCard">
        <Card maxW='lg'>
            {props.includeLikes &&
                <CardHeader>
                <Flex spacing='4'>
                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                    <Box>
                    <Heading size='md'>{props.name}</Heading>
                    <Text>{props.location}</Text>
                    </Box>
                </Flex>
                <Button width="100px" variant='ghost' backgroundColor={liked ? 'brand.200' : 'white' } _hover='brand.200' onClick={() => {setLiked(!liked)}} leftIcon={<Icon as={MdOutlineThumbUpOffAlt} />}>
                Like ({props.likes})
                </Button>                
                </Flex>
            </CardHeader>
            }
            {!props.includeLikes &&
                <CardHeader>
                <Flex spacing='4'>
                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                    <Box>
                    <Heading size='lg'>Trip #{props.num+1}: {props.location}</Heading>
                    </Box>
                </Flex>
                <HStack>
                <Icon as={MdOutlineThumbUpOffAlt} />
                <Heading size='md'> {props.likes}</Heading> 
                </HStack>              
                </Flex>
            </CardHeader>
            }
            <Image
                objectFit='cover'
                src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                alt='Chakra UI'
                margin="5"
            />
            <CardBody>
                <HStack spacing="auto">
                <Heading size="sm">
                Total Distance: {props.total_distance} miles
                </Heading>
                <Heading size="sm">
                Total Price: ${props.total_price}
                </Heading>
                </HStack>
                <HStack spacing="auto">
                <Heading size="sm">
                
                </Heading>
                <Heading size="sm">
                Budget: ${props.budget}
                </Heading>
                </HStack>
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
            <VStack align="stretch" width="100%">
            <Button color='teal.500' href='#' onClick={() => {setItinerary(!itinerary)}}>
                {itinerary ? "Close Itinerary" : "View Itinerary"}
            </Button>
            {itinerary === true && <VStack align="stretch">
                <Heading size='lg' align="center">
                    Itinerary
                </Heading>
                <Divider />
                <HStack spacing="auto" width="100%">
                <Heading size='sm' marginBottom="3" marginTop="3">
                    Hotel: {props.hotel}
                </Heading>
                <Text as="i">Money Spent: ${props.hotel_price}</Text>
                </HStack>
                <Divider />
                {props.days.map((day,num) => (
                <>
                <Heading size='sm' marginTop="2" marginBottom="2">
                    Day {num+1}:
                </Heading>
                <VStack alignItems="start">
                    <HStack>
                        <Icon as={MdAttractions} color='green.500' />
                        <Text>Activity: {day.attraction}</Text>
                    </HStack>
                    <HStack>
                        <Icon as={MdOutlineFastfood} color='green.500' />
                        <Text>Lunch: {day.food1}</Text>
                    </HStack>

                    <HStack>
                        <Icon as={MdOutlineFastfood} color='green.500' />
                        <Text>Dinner: {day.food2}</Text>
                    </HStack>
                </VStack>
                <HStack spacing="auto" width="100%">
                <Text marginTop="2" marginBottom="2" as="i">
                    Distance: {day.miles_traveled} miles
                </Text>
                <Text marginTop="2" marginBottom="2" as="i">
                    Money Spent: ${day.daily_price}
                </Text>
                </HStack>
                </>
                ))}
                
                <Divider />
            </VStack>}
          </VStack>
        </CardFooter>
      </Card>
    </div>
    );
}

export default ItineraryCard;
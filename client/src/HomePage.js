import React, {useState, useContext} from "react";
import {
    Heading,
    Input,
    HStack,
    VStack,
    Button,
    NumberInput,
    NumberInputField,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Checkbox,
    Text,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Divider,
    Spinner,
    Card,
    CardBody,
    Image
 } from '@chakra-ui/react'

import { Icon, StarIcon } from '@chakra-ui/icons'
import { MdOutlineFastfood, MdAttractions, MdHome } from 'react-icons/md'
import "./HomePage.css";
import axios from "axios";
import UserContext from "./UserContext";

function HomePage() {
    const { currentUsername } = useContext(UserContext);
    const [location, setLocation] = useState("")
    const [budget, setBudget] = useState()
    const [numberOfDays, setNumberOfDays] = useState()

    const [amusementPark, setAmusementPark] = useState(false)
    const [aquarium, setAquarium] = useState(false)
    const [museum, setMuseum] = useState(false)
    const [nationalPark, setNationalaPark] = useState(false)
    const [maxDistance, setMaxDistance] = useState(100)
    const [shoppingMall, setShoppingMall] = useState(false)
    const [store, setStore] = useState(false)
    const [zoo, setZoo] = useState(false)

    const [isGenerating, setIsGenerating] = useState(false)

    const [trip, setTrip] = useState(null)

    const [tripAdded, setTripAdded] = useState(false)


    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }

    const generateTrip = async () => {
        setIsGenerating(true)
        console.log(location, budget, numberOfDays, amusementPark, museum, nationalPark, maxDistance, isGenerating)
        
        // CALL API TO GET TRIP
        const result = await axios.get("http://localhost:8000/generate-trip", {
            params: {
                location: location,
                budget: budget,
                num_days: numberOfDays,
                distance_from_hotel: maxDistance,
            }
        })

        console.log(result)
    
        if(result){
            console.log(result)
            setTrip(result.data)
        }

        setIsGenerating(false)
        
    }

    const addTrip = async () => {
        setTripAdded(true)
        try {
            const days = trip.itinerary.map(element => {
                return (
                    {
                        attraction: element.activity.name,
                        food1: element.restaurant_1.name,
                        food2: element.restaurant_2.name,
                        daily_price: element.daily_price,
                        miles_traveled: element.daily_distance_miles
                    }
                )
            })
            const result = await axios.post("http://localhost:8000/create-trip", {
                // username, location, hotel, budget, days, total_price

                username: currentUsername,
                location: location,
                hotel: trip.hotel.name,
                budget: budget,
                total_price: trip.total_price,
                days: days,
            })

        }
        catch {
            console.log("error signing up :(")
        }
    }

    return (
    <VStack spacing='40px' paddingTop="30px">
        <HStack>
            <Icon w={12} h={12} as={MdHome}/>
            <Heading fontSize="5xl">budgetTrip</Heading>
        </HStack>
        <HStack spacing='20px'>
            <Input
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder='Enter your dream trip location'
                backgroundColor="white"
                color="black"
                w={300}
            />
            <NumberInput>
                <NumberInputField
                    value={budget}
                    onChange={e => setBudget(e.target.value)}
                    placeholder='Enter your budget ($)'
                    backgroundColor="white"
                    color="black"
                    w={300}
                />
            </NumberInput>
            <NumberInput>
                <NumberInputField
                    value={numberOfDays}
                    onChange={e => setNumberOfDays(e.target.value)}
                    placeholder='Enter your trip length (days)'
                    backgroundColor="white"
                    color="black"
                    w={300}
                />
            </NumberInput>
        </HStack>
        <Accordion allowMultiple w={500}>
            <AccordionItem>
                <AccordionButton>
                    <Text fontWeight='bold'>Advanced Options</Text>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                    <VStack align='stretch'>
                        <Checkbox
                            iconColor="white"
                            colorScheme="brand"
                            onChange={(e) => setAmusementPark(e.target.checked)}
                        >
                            Amusement Park
                        </Checkbox>
                        <Checkbox
                            iconColor="white"
                            colorScheme="brand"
                            onChange={(e) => setAquarium(e.target.checked)}
                        >
                            Aquarium
                        </Checkbox>
                        <Checkbox
                            iconColor="white"
                            colorScheme="brand"
                            onChange={(e) => setMuseum(e.target.checked)}
                        >
                            Museum
                        </Checkbox>
                        <Checkbox
                            iconColor="white"
                            colorScheme="brand"
                            onChange={(e) => setNationalaPark(e.target.checked)}
                        >
                            National Park
                        </Checkbox>
                        <Checkbox
                            iconColor="white"
                            colorScheme="brand"
                            onChange={(e) => setShoppingMall(e.target.checked)}
                        >
                            Shopping Mall
                        </Checkbox>
                        <Checkbox
                            iconColor="white"
                            colorScheme="brand"
                            onChange={(e) => setStore(e.target.checked)}
                        >
                            Store
                        </Checkbox>
                        <Checkbox
                            iconColor="white"
                            colorScheme="brand"
                            onChange={(e) => setZoo(e.target.checked)}
                        >
                            Zoo
                        </Checkbox>
                        <Divider />
                        <Text>Max distance from hotel: {maxDistance} miles</Text>
                        <Slider aria-label='slider-ex-2' colorScheme='brand' defaultValue={50} min={5} max={250} step={1} onChange={(val) => setMaxDistance(val)}>
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb />
                        </Slider>
                    </VStack>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
        <Button
            color='white'
            backgroundColor='brand.200'
            _hover={{ bg: "brand.400" }}
            variant='solid'
            w={300}
            onClick={generateTrip}
            isDisabled={location==="" | budget === null | numberOfDays === null}
            isLoading={isGenerating}
            spinner={<Spinner size="md"/>}
        >
            Generate my trip!
        </Button>
        {trip != null && !isGenerating && (
            <VStack border='1px' borderColor='white' borderRadius={10} align='strech' w={900}  padding="20px" backgroundColor="gray.200">
                <HStack spacing='auto'>
                    <Heading fontSize='3xl' color="black">New Trip!</Heading>
                    <Button
                        leftIcon={<StarIcon />}
                        color='white'
                        backgroundColor={tripAdded ? "brand.400" : "brand.200"}
                        _hover={{ bg: "gray.400", color: "white" }}
                        _active={{ bg: "gray.400"}}
                        // borderColor='brand.400'
                        // border={tripAdded ? "0px" : "1px"}
                        variant='solid'
                        fontSize='xl'
                        onClick={() => addTrip()}
                        width={250}
                    >
                        {tripAdded ? "Added!" : "Add to profile"}
                        </Button>
                </HStack>
                <Card key={-1} border='1px' borderColor='white' borderRadius={20} backgroundColor='white'>
                    <CardBody>
                        <HStack spacing='auto'>
                            <Text fontSize='xl' color="black" fontWeight="bold">Total Price: ${Math.round(trip.total_price*100)/100}</Text>
                            <Text fontSize='xl' color="black" fontWeight="bold">Total Distance: {Math.round(trip.trip_distance_miles)} miles</Text>
                            <Text fontSize='xl' color="black" fontWeight="bold">Total Time: {Math.round(trip.trip_time_hours)} hours</Text>
                        </HStack>
                    </CardBody>
                </Card>
                <Card key={-1} border='1px' borderColor='white' borderRadius={20} backgroundColor='white'>
                    <CardBody>
                        <HStack spacing='auto'>
                            <Text fontSize='xl' color="black" fontWeight="bold">Hotel: {trip.hotel.name} (${trip.hotel.price})</Text>
                            <Text fontSize='xl' color="black" fontWeight="bold">{trip.hotel.rating}<StarIcon boxSize={4} marginBottom="1"/> ({trip.hotel.num_ratings} ratings)</Text>
                        </HStack>
                    </CardBody>
                </Card>
                {trip.itinerary.map((element, index) => {
                    return (
                        <Card key={index} border='1px' borderColor='white' borderRadius={20} backgroundColor='white'>
                            <CardBody>
                                <HStack spacing='auto'>
                                    <VStack align='stretch'>
                                        <Text fontSize='xl' fontWeight='bold' color='black'>Day {index+1}</Text>
                                        <HStack spacing="auto">
                                            <HStack>
                                                <Icon as={MdAttractions} color="black"/>
                                                <Text color="black">Attraction: {element.activity.name}</Text>
                                            </HStack>
                                            <Text color="black">{element.activity.rating}<StarIcon boxSize={3} marginBottom="1"/></Text>
                                        </HStack>
                                        <HStack spacing="auto">
                                            <HStack>
                                                <Icon as={MdOutlineFastfood} color="black"/>
                                                <Text color="black">Lunch: {element.restaurant_1.name}</Text>
                                            </HStack>
                                            <Text color="black">{element.restaurant_1.rating}<StarIcon boxSize={3} marginBottom="1"/></Text>
                                        </HStack>
                                        <HStack spacing="auto">
                                            <HStack>
                                                <Icon as={MdOutlineFastfood} color="black"/>
                                                <Text color="black">Dinner: {element.restaurant_2.name}</Text>
                                            </HStack>
                                            <Text color="black">{element.restaurant_2.rating}<StarIcon boxSize={3} marginBottom="1"/></Text>
                                        </HStack>
                                        <HStack spacing='30px'>
                                            <Text color='black' fontWeight='bold'>Price: ${Math.round(element.daily_price*100)/100}</Text>
                                            <Text color='black' fontWeight='bold'>Distance: {Math.round(element.daily_distance_miles)} miles</Text>
                                            <Text color='black' fontWeight='bold'>Travel time: {Math.round(element.daily_duration_minutes)} minutes</Text>
                                        </HStack>
                                    </VStack>
                                    <Image
                                        objectFit='cover'
                                        src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                                        alt='Chakra UI'
                                        maxH={150}
                                        maxW={225}
                                    />
                                </HStack>
                            </CardBody>
                        </Card>
                    )
                })}
            </VStack>
        )}
    </VStack>
    );
}

export default HomePage;
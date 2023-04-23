import React, {useState} from "react";
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

function HomePage() {
    const [location, setLocation] = useState("")
    const [budget, setBudget] = useState()
    const [numberOfDays, setNumberOfDays] = useState()

    const [amusementPark, setAmusementPark] = useState(false)
    const [museum, setMuseum] = useState(false)
    const [nationalPark, setNationalaPark] = useState(false)
    const [maxDistance, setMaxDistance] = useState(100)

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
        await timeout(2000); //for 1 sec delay

        setTrip({
            userID: "123",
            location: location,
            hotel: "Cardboard Box",
            total_price: 999.98,
            budget: budget,
            num_likes: 0,

            // list of days in the trip
            days: [
                {
                    attraction: "Eiffel Tower",
                    food1: "La brasserie du 7eme",
                    food2: "McDonalds",
                    daily_budget: "40",
                    miles_traveled: "10"
                },
                {
                    attraction: "Notre Dame",
                    food1: "Chicken Kebab",
                    food2: "Burger King",
                    daily_budget: "100",
                    miles_traveled: "25"
                },
            ]
        })
        setIsGenerating(false)
        
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
                        <Divider />
                        <Text>Max distance from hotel: {maxDistance} miles</Text>
                        <Slider aria-label='slider-ex-2' colorScheme='brand' defaultValue={100} min={0} max={500} step={1} onChange={(val) => setMaxDistance(val)}>
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
            // isDisabled={location==="" | budget === null | numberOfDays === null}
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
                        backgroundColor={tripAdded ? 'red.500' : 'brand.200'}
                        _hover={{ bg: "gray.400", color: "white" }}
                        _active={{ bg: "gray.400"}}
                        // borderColor='brand.400'
                        // border={tripAdded ? "0px" : "1px"}
                        variant='solid'
                        fontSize='xl'
                        onClick={() => setTripAdded(!tripAdded)}
                        width={250}
                    >
                        {tripAdded ? "Remove from profile" : "Add to profile!"}
                        </Button>
                </HStack>
                <Card key={-1} border='1px' borderColor='white' borderRadius={20} backgroundColor='white'>
                    <CardBody>
                        <HStack spacing='auto'>
                            <Text fontSize='xl' color="black" fontWeight="bold">Total Price: ${trip.total_price}</Text>
                            <Text fontSize='xl' color="black" fontWeight="bold">Hotel: {trip.hotel}</Text>
                        </HStack>
                    </CardBody>
                </Card>
                {trip.days.map((element, index) => {
                    return (
                        <Card key={index} border='1px' borderColor='white' borderRadius={20} backgroundColor='white'>
                            <CardBody>
                                <HStack spacing='auto'>
                                    <VStack align='stretch'>
                                        <Text fontSize='xl' fontWeight='bold' color='black'>Day {index}</Text>
                                        <HStack>
                                            <Icon as={MdAttractions} color="black"/>MdAttractions
                                            <Text color="black">Attraction: {element.attraction}</Text>
                                        </HStack>
                                        <HStack>
                                            <Icon as={MdOutlineFastfood} color="black"/>
                                            <Text color="black">Lunch: {element.food1}</Text>
                                        </HStack>
                                        <HStack>
                                            <Icon as={MdOutlineFastfood} color="black"/>
                                            <Text color="black">Dinner: {element.food2}</Text>
                                        </HStack>
                                        <HStack spacing='30px'>
                                            <Text color='black' fontWeight='bold'>Price: ${element.daily_budget}</Text>
                                            <Text color='black' fontWeight='bold'>Distance: {element.miles_traveled} miles</Text>
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
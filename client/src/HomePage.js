import React, {useState, useEffect} from "react";
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
    SliderMark,
    Divider,
    Spinner,
 } from '@chakra-ui/react'
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


    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }

    const generateTrip = async () => {
        setIsGenerating(true)
        console.log(location, budget, numberOfDays, amusementPark, museum, nationalPark, maxDistance, isGenerating)
        // CALL API TO GET TRIP
        await timeout(2000); //for 1 sec delay

        setTrip(1)
        setIsGenerating(false)
        
    }

    return (
    <VStack spacing='40px'>
        <Heading>Home Page</Heading>
        <HStack spacing='20px'>
            <Input
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder='Enter your dream trip location'
                w={400}
            />
            <NumberInput>
                <NumberInputField
                    value={budget}
                    onChange={e => setBudget(e.target.value)}
                    placeholder='Enter your buget ($)'
                    w={400}
                />
            </NumberInput>
            <NumberInput>
                <NumberInputField
                    value={numberOfDays}
                    onChange={e => setNumberOfDays(e.target.value)}
                    placeholder='Enter your trip length (days)'
                    w={400}
                />
            </NumberInput>
        </HStack>
        <Accordion allowMultiple w={500}>
            <AccordionItem>
                <AccordionButton>
                    <Text>Advanced Options</Text>
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
            isDisabled={location==="" | budget === null | numberOfDays === null | isGenerating}
        >
            Generate my trip!
        </Button>
        {isGenerating && (<Spinner size='xl'/>)}
        {trip != null && !isGenerating && (
            <Heading>Trip!</Heading>
        )}
    </VStack>
    );
}

export default HomePage;
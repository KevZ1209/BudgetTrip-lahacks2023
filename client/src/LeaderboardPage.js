import React from "react";
import { useState } from 'react';
import "./LeaderboardPage.css";
import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, ButtonGroup, Button, Flex, Avatar, Box, IconButton, Link, Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer, } from '@chakra-ui/react';
import { VStack } from "@chakra-ui/react";
import { CheckIcon } from '@chakra-ui/icons'

function LeaderboardPage() {
    const userList = [5,8];
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
        <Card maxW='md' key={index}>
            <CardHeader>
                <Flex spacing='4'>
                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                    <Box>
                    <Heading size='sm'>Marcus Cheng</Heading>
                    <Text>Cleveland, Ohio</Text>
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
                With Chakra UI, I wanted to sync the speed of development with the speed
                of design. I wanted the developer to be just as excited as the designer to
                create a screen.
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
                <Text>
            {itinerary[index] === false && <Link color='teal.500' href='#' onClick={() => {changeItinerary(true, index)}}>
                View Itinerary
            </Link>}
            {itinerary[index] === true && <Link color='teal.500' href='#' onClick={() => {changeItinerary(false, index)}}>
                Close Itinerary
            </Link>}
            </Text>
            {itinerary[index] === true && <TableContainer>
            <Table size='sm'>
                <Thead>
                <Tr>
                    <Th>Hotel</Th>
                    <Th>Location</Th>
                    <Th isNumeric>Price ($)</Th>
                </Tr>
                </Thead>
                <Tbody>
                <Tr>
                    <Td>Motel 6</Td>
                    <Td>Cleveland</Td>
                    <Td isNumeric>420.69</Td>
                </Tr>
                </Tbody>
                <Thead>
                <Tr>
                    <Th>Day 1</Th>
                    <Th>Location</Th>
                    <Th isNumeric>Price ($)</Th>
                </Tr>
                </Thead>
                <Tbody>
                <Tr>
                    <Td>Cavaliers Game</Td>
                    <Td>Cleveland</Td>
                    <Td isNumeric>19.21</Td>
                </Tr>
                <Tr>
                    <Td>McDonald's</Td>
                    <Td>Cleveland</Td>
                    <Td isNumeric>11.48</Td>
                </Tr>
                <Tr>
                    <Td>Burger King</Td>
                    <Td>Cleveland</Td>
                    <Td isNumeric>9.64</Td>
                </Tr>
                </Tbody>
                <Thead>
                <Tr>
                    <Th>Day 2</Th>
                    <Th>Location</Th>
                    <Th isNumeric>Price ($)</Th>
                </Tr>
                </Thead>
                <Tbody>
                <Tr>
                    <Td>Browns Game</Td>
                    <Td>Cleveland</Td>
                    <Td isNumeric>37.21</Td>
                </Tr>
                <Tr>
                    <Td>Canes</Td>
                    <Td>Cleveland</Td>
                    <Td isNumeric>17.21</Td>
                </Tr>
                <Tr>
                    <Td>Taco Bell</Td>
                    <Td>Cleveland</Td>
                    <Td isNumeric>7.29</Td>
                </Tr>
                </Tbody>
            </Table>
            </TableContainer>}
            </CardFooter>
            </Card>
      ))}
    </VStack>
      
        
    </div>
    );
}


export default LeaderboardPage;
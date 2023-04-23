import React from "react";
import { HStack, Text, Divider, Button, VStack, Image } from '@chakra-ui/react'
import {NavLink, useLocation} from 'react-router-dom';

function CustomNavBar() {

    const location = useLocation()

    return (
        <VStack id="navbarstack" align="strech"  backgroundColor="brand.100">
            <HStack spacing="50px" paddingLeft="30px" paddingTop="20px" paddingBottom="20px">
                <Image src='/logo.png' h="60px" w="60px"/>
              <NavLink
                to="/"
                style={{ textDecoration: "none", marginRight: "0.5rem" }}
                className="navButton"
              >
                <Text fontSize="xl" fontWeight="bold" _hover={{ borderBottom: "2px", borderColor: "brand.400" }} borderBottom={location.pathname==="/" ? "2px": "0px"}  borderColor="brand.200">Home</Text>

              </NavLink>
              <NavLink
                to="/profile"
                style={{ textDecoration: "none", marginRight: "0.5rem" }}
                className="navButton"
              >
                <Text fontSize="xl" fontWeight="bold" _hover={{ borderBottom: "2px", borderColor: "brand.400" }} borderBottom={location.pathname==="/profile" ? "2px": "0px"} borderColor="brand.200">Profile</Text>
              </NavLink>
              <NavLink
                to="/feed"
                style={{ textDecoration: "none", marginRight: "0.5rem" }}
                className="navButton"
              >
                <Text fontSize="xl" fontWeight="bold" _hover={{ borderBottom: "2px", borderColor: "brand.400" }} borderBottom={location.pathname==="/feed" ? "2px": "0px"} borderColor="brand.200">Feed</Text>
              </NavLink>
              <NavLink
                to="/login"
                style={{ textDecoration: "none", marginRight: "0.5rem" }}
                className="navButton"
              >
                <Text fontSize="xl" fontWeight="bold" _hover={{ borderBottom: "2px", borderColor: "brand.400" }} borderBottom={location.pathname==="/login" ? "2px": "0px"} borderColor="brand.200">Login</Text>
              </NavLink>
            </HStack>
            <Divider width="99.5%" borderWidth="1px" borderColor="white"/>
        </VStack>
    )
}

export default CustomNavBar;
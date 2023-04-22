import React, { useState} from "react";
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { ChakraProvider, extendTheme, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, HStack, Text, Divider, Button, VStack } from '@chakra-ui/react'
import HomePage from "./HomePage";
import ProfilePage from "./ProfilePage";
import LeaderboardPage from "./LeaderboardPage";
import LoginPage from "./LoginPage";
import './App.css';
import UserContext from "./UserContext";




function App() {
  const [currentUsername, setCurrentUsername] = useState(null);

  const theme = extendTheme({
    colors: {
      brand: {
        100: "#00425A",
        200: "#1F8A70",
        300: "#BFDB38",
        400: "#FC7300",
        500: "#1F8A70",
      },
    },
    styles: {
      global: {
        // styles for the `body`
        body: {
          bg: 'brand.100',
          color: 'white',
        },
        // styles for the `a`
        Heading: {
          color: 'white',
        },
        // CheckBox: {
        //   color: 'brand.200',
        //   iconColor: 'brand.400'
        // },
        // Button: {
        //   color:'white',
        //   backgroundColor:'brand.200',
        //   _hover: { bg: "brand.400" }
        // }
      },
    },
  })
  
  return (
    <UserContext.Provider value={{currentUsername, setCurrentUsername}}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>

        {/* {currentUsername && (
          <Breadcrumb separator=' '>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>Home</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href='profile'>Profile</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href='leaderboard'>Leaderboard</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href='login'>Login</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        )} */}
        {currentUsername && (
          <VStack id="navbarstack" align="strech">
            <HStack spacing="50px" paddingLeft="30px" paddingTop="20px" paddingBottom="20px" backgroundColor="brand.100">
              {/* LOGO */}
              <NavLink
                to="/"
                style={{ textDecoration: "none", marginRight: "0.5rem" }}
                className="navButton"
              >
                <Text fontSize="lg" fontWeight="bold" _hover={{ textDecoration: "none" }}>Home</Text>
              </NavLink>
              <NavLink
                to="/profile"
                style={{ textDecoration: "none", marginRight: "0.5rem" }}
                className="navButton"
              >
                <Text fontSize="lg" fontWeight="bold">Profile</Text>
              </NavLink>
              <NavLink
                to="/feed"
                style={{ textDecoration: "none", marginRight: "0.5rem" }}
                className="navButton"
              >
                <Text fontSize="lg" fontWeight="bold">Feed</Text>
              </NavLink>
              <NavLink
                to="/login"
                style={{ textDecoration: "none", marginRight: "0.5rem" }}
                className="navButton"
              >
                <Text fontSize="lg" fontWeight="bold">Login</Text>
              </NavLink>
            </HStack>
            <Divider width="99%" borderWidth="1px" borderColor="white"/>
          </VStack>
        )}
          <Routes>
            <Route exact path="/" element={currentUsername ? <HomePage/> : <LoginPage/>}/>
            <Route path="/profile" element={<ProfilePage/>} />
            <Route path="/feed" element={<LeaderboardPage/>} />
            <Route path="/login" element={<LoginPage/>} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </UserContext.Provider>
  );
}

export default App;

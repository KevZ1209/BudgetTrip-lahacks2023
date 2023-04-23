import React, { useState} from "react";
import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { ChakraProvider, extendTheme, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, HStack, Text, Divider, Button, VStack } from '@chakra-ui/react'
import HomePage from "./HomePage";
import ProfilePage from "./ProfilePage";
import LeaderboardPage from "./LeaderboardPage";
import LoginPage from "./LoginPage";
import './App.css';
import UserContext from "./UserContext";
import CustomNavBar from "./CustomNavBar";


function App() {
  const [currentUsername, setCurrentUsername] = useState(null);

  // const location = useLocation();

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
          <CustomNavBar />
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

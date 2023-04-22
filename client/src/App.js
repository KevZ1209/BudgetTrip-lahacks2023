import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { ChakraProvider, extendTheme, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@chakra-ui/react'
import HomePage from "./HomePage";
import ProfilePage from "./ProfilePage";
import LeaderboardPage from "./LeaderboardPage";
import LoginPage from "./LoginPage";
import './App.css';




function App() {

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
    <ChakraProvider theme={theme}>
      <BrowserRouter>
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

      {/* <div className="navBar">
        <NavLink
          to="/"
          style={{ textDecoration: "none", marginRight: "0.5rem" }}
          className="navButton"
        >
          <div>Home</div>
        </NavLink>
        <NavLink
          to="/profile"
          style={{ textDecoration: "none", marginRight: "0.5rem" }}
          className="navButton"
        >
          <div>Profile</div>
        </NavLink>
        <NavLink
          to="/leaderboard"
          style={{ textDecoration: "none", marginRight: "0.5rem" }}
          className="navButton"
        >
          <div>Leaderboard</div>
        </NavLink>
        <NavLink
          to="/login"
          style={{ textDecoration: "none", marginRight: "0.5rem" }}
          className="navButton"
        >
          <div>Login</div>
        </NavLink>
      </div> */}
      <Routes>
        <Route exact path="/" element={<HomePage/>} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/leaderboard" element={<LeaderboardPage/>} />
        <Route path="/login" element={<LoginPage/>} />
      </Routes>
    </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;

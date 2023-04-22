import React, { useState, useContext } from "react";
import { Heading, VStack, Input, Button, useToast, Text } from '@chakra-ui/react'
import UserContext from "./UserContext";
import "./LoginPage.css";
import axios from "axios";

function LoginPage() {
    
    const [username, setUsername] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [loggingIn, setLoggingIn] = useState(true)
    const { currentUsername, setCurrentUsername } = useContext(UserContext);

    const toast = useToast()

    const createUser = async () => {
        try {
            const result = await axios.post("http://localhost:8000/create-user", {
                name: name,
                username: username,
                password: password
            })

            if(result && result.data) {
                setLoggingIn(true);
                toast({
                    title: 'Account created!',
                    description: "We've created your account for you. Welcome to budgeTRIP!",
                    status: 'success',
                    duration: 8000,
                    isClosable: true,
                })
            }
            else {
                toast({
                    title: 'Failed to create account :(',
                    colorScheme: 'red',
                    description: "Coudn't create a user. Maybe try another username?",
                    status: 'error',
                    duration: 8000,
                    isClosable: true,
                })

            }

        }
        catch {
            console.log("error signing up :(")
        }
    }

    const logIn = async () => {
        try{
            const result = await axios.post("http://localhost:8000/login", {
                username: username,
                password: password
            })

            console.log(result)
    
            if(result && result.data) {
                toast({
                    title: 'Login successful!',
                    description: "Feel free to explore budgeTRIP",
                    status: 'success',
                    duration: 8000,
                    isClosable: true,
                })
                setCurrentUsername(username)
            }
            else {
                toast({
                    title: 'Failed to log in :(',
                    colorScheme: 'red',
                    description: "Make sure you have the right username and password",
                    status: 'error',
                    duration: 8000,
                    isClosable: true,
                })
    
            }
        }
        catch {
            console.log("error loggin in :(")
        }
        
    }

    const logout = async () => {
        setCurrentUsername(null)
    }

    return (
        <VStack spacing="20px" paddingTop="20px">
            <Heading>Login Page</Heading>
            {currentUsername ? (
                <>
                    <Text>You are already logged in</Text>
                    <Button
                        color='white'
                        backgroundColor='brand.200'
                        _hover={{ bg: "brand.400" }}
                        variant='solid'
                        w={300}
                        onClick={logout}
                    >
                        Log out
                    </Button>
                </>
            ) : (
                <>
                    {loggingIn ? (
                    <>
                        <Input
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder='Username'
                            backgroundColor="white"
                            color="black"
                            w={300}
                        />
                        <Input
                            value={password}
                            type="password"
                            onChange={e => setPassword(e.target.value)}
                            placeholder='Password'
                            backgroundColor="white"
                            color="black"
                            w={300}
                        />
                        <Button
                            color='white'
                            backgroundColor='brand.200'
                            _hover={{ bg: "brand.400" }}
                            variant='solid'
                            w={300}
                            onClick={logIn}
                            isDisabled={username === "" | password === ""}
                        >
                            Log in!
                        </Button>
                    </>
                ) : (
                    <>
                        <Input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder='Full Name'
                            backgroundColor="white"
                            color="black"
                            w={300}
                        />
                        <Input
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder='Username'
                            backgroundColor="white"
                            color="black"
                            w={300}
                        />
                        <Input
                            value={password}
                            type="password"
                            onChange={e => setPassword(e.target.value)}
                            placeholder='Password'
                            backgroundColor="white"
                            color="black"
                            w={300}
                        />
                        <Input
                            value={confirmPassword}
                            type="password"
                            onChange={e => setConfirmPassword(e.target.value)}
                            placeholder='Confirm Password'
                            backgroundColor="white"
                            color="black"
                            w={300}
                            isInvalid={confirmPassword !== password}
                        />
                        <Button
                            color='white'
                            backgroundColor='brand.200'
                            _hover={{ bg: "brand.400" }}
                            variant='solid'
                            w={300}
                            onClick={createUser}
                            isDisabled={name==="" | username === "" | password === "" | confirmPassword !== password}
                        >
                            Sign up!
                        </Button>
                    </>
                )}
                <Button
                    color='white'
                    variant='link'
                    w={300}
                    onClick={() => setLoggingIn(!loggingIn)}
                >
                    {loggingIn ? "Don't have an account? Sign up" : "Already have an account? Log in"}
                </Button>
                </>
            )}

            
        </VStack>
    );
}

export default LoginPage;
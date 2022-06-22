import { Box, TextField } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import { User } from "../models/user";
import ErrorMessage from "./ErrorMessage";

interface ILoginProps {
    // An Interface is used here as it's most appropriate


    currentUser: User | undefined | null,  // union type
    // the imported User class

    // A function that takes User type as input and outputs nothing
    setCurrentUser: (nextUser: User) => void
}


function Login(props: ILoginProps) { 
    // We specify that this takes input that has to be in the form of ILoginProps

        // The "const [var1, var2]" is a destructuring assignment
        const [username, setUsername] = useState(''); 
        const [password, setPassword] = useState(''); 
        const [errorMsg, setErrorMsg] = useState<string>();
        // defining state for variables used in this .tsx file


        // Whenever the username field is updated, it calls this function
        let updateUsername = (e: SyntheticEvent) => {
            
            setUsername((e.target as HTMLInputElement).value);
            // finds the element that called this function and takes its text
            // sets username state to that value
        }

        let updatePassword = (e: SyntheticEvent) => { // same functionality as above

            setPassword((e.target as HTMLInputElement).value); 

        }
        
        let login = async (e: SyntheticEvent) => {
            
            e.preventDefault(); // prevent default event logic from running
            // like if you use form, prevent it from sending a GET request with params
            // because we want to control what the button does.


            if (!username || !password) { // If any input field is blank,
                setErrorMsg("This webpage says: the username or passowrd field was empty"); 
            } // if either field was blank, server won't be contacted
            else {
                setErrorMsg(''); // remove any error currently displayed
                try {
                    // await means that "resp" varaible is the response, rather than a promise
                    let resp = await fetch('http://localhost:5000/notecard/auth', // API endpoint
                        {
                            method: 'POST', 
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({username, password})
                            // packages up the username and password like this: 
                            /*
                            {
                                "username": "whatever the user entered @revature.net",
                                "password": "whatever the user entered"
                            }
                            
                            */
                        }
                    );
                    // The server has sent back a response code... 
                    if (Math.floor(resp.status/100) !== 2) { // if that code is not a 200, 204, 2-whatever
                        setErrorMsg("Could not validate provided credentials!"); //  
                        let data = await resp.text(); // The database sends errors in text format
                        setErrorMsg(data);            // that text is displayed

                    } else { // this is ran if the response code is a 200, 204, 2-anything
                        let data = await resp.json(); // waits for the response data and stores it as data
                        props.setCurrentUser(data);   // the response JSON has the keys identical to User object fields
                        // so, props.setCurrentUser sets the authUser in the App.tsx as the User data the DB sent back
                    }   
                } catch(err) { // This will run in situations like the API was not running
                    setErrorMsg("There was an error communicating with the API");
                } 
            }
        }
    return ( 
    
        props.currentUser ? 
        <Navigate to="/dashboard"/> : // If props.currentUser is set, it's truthy and so... 
        // redirect to Dashboard
        <> 
            <h4>Login to Notecard</h4> {/* Show a header on page */}
            <Box    // Material UI copy+paste to use professional rendering of the form. 
                component="form"
                sx = {{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
            >
                <div> {/* these div elements cause the TextField elements to render on separate lines */}
                    <TextField
                        id="un-login"
                        label="myusername@revature.net"
                        type="Email"
                        onChange={updateUsername} 
                        // when the input in this field changes, 
                        // call the fct to set the "state" username
                    />
                </div>
                <div>
                    <TextField
                        id="password-registration"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        // helperText="Password must include: "" //might include this later 

                        onChange={updatePassword}
                        // when the input in this field changes, call the fct to set the "state" password
                    />
                </div>
                <br/>
                <button id="login-button" onClick={login}>Login</button> {/*  Display text on button is "Login" */}
                {/*  when clicked, calls the function "login" */}
                <br/>
                { errorMsg ? 
                    // If errorMsg (a piece of state) has a message, show that message
                    <ErrorMessage errorMessage = {errorMsg}></ErrorMessage>
                    : 
                    <></> // but if it is empty, derender it 
                }
            </Box>
        </> 
    );
}

export default Login; // export so it's avaliable to App.tsx

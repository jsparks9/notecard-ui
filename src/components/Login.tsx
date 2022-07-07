import { Box, TextField } from "@mui/material";
import Button from '@mui/material/Button';
import { SyntheticEvent, useState, KeyboardEvent } from "react";
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

        let keydownHandler = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                login(e);
            }
        }
        
        let login = async (e: SyntheticEvent) => {
            
            e.preventDefault(); // prevent default event logic from running
            // like if you use form, prevent it from sending a GET request with params
            // because we want to control what the button does.


            if (!username || !password) { // If any input field is blank,
                setErrorMsg("Username and password required");
            } // if either field was blank, server won't be contacted
            else {
                setErrorMsg(''); // remove any error currently displayed
                try {
                    // await means that "resp" variable is the response, rather than a promise
                    let resp = await fetch('http://notecardapi-env.eba-psis3xqw.us-east-1.elasticbeanstalk.com/notecard/auth/login', // API endpoint
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
        <Navigate to="/decks"/> :
        // show dashboard instead of this <p> tag content
        <> <div className="img-container">
                <div className="img-parent">               
                    <img src="https://i.imgur.com/u7ir75v.png" alt="logo" className="app-logo"/>   
                    <img src="https://i.imgur.com/Pi5dL2u.png" alt="card" className="app-frame"/>
                </div>
        </div>
        <Box
            id="login-form"
            component="form"
            sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <br/>
            <div>
                <div>
                    <TextField
                        id="un-login"
                        label="username@revature.net"
                        type="Email"
                        onKeyUp={keydownHandler}
                        onChange={updateUsername}
                    />
                </div>
                <div>
                    <TextField
                        id="pw-login"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        //helperText="Password must include: "
                        onKeyUp={keydownHandler}
                        onChange={updatePassword}
                    />
                </div>

                { errorMsg ? // ternary op
                                <ErrorMessage errorMessage = {errorMsg}></ErrorMessage>
                                : // if falsey
                                <><br/></>
                }
                <Button id="login-button" onClick={login} variant="contained" sx= {{background: "#263238"}}>Login</Button>
                <br/><br/><br/>
            </div>
        </Box>

{/* 
        <div id="login-form">
        <h3>Please log in</h3>
        <input type="email" id="username" placeholder="user@Revature.net" onChange={updateUsername}></input>
        <br/><br/>
        <input type="password" id="login-password" placeholder="Password" onChange={updatePassword}></input>
        <br/><br/>
        <button id="login-button" onClick={login}>Login</button>
        <br/><br/>
        </div>
        <div
            id="error-message">
        { errorMsg ? // ternary op
            <ErrorMessage errorMessage = {errorMsg}></ErrorMessage>
            : // if falsey
            <></>
        }</div>
         */}
        </> // need to render it somewhere
    )
}

export default Login; // export so it's available to App.tsx

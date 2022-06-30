import { Box, TextField } from "@mui/material";
import { useState, SyntheticEvent } from "react";
import { Navigate } from "react-router-dom";
import { User } from "../models/user";
// import {login} from "../Login";
import ErrorMessage from "./ErrorMessage";

interface IRegisterProps {

        // fields any methods : interface is most appropriate
    
        currentUser: User | undefined | null,  // union type
    
        // update function
        setCurrentUser: (nextUser: User) => void
    }


function Register(props: IRegisterProps) {

    const [username, setUsername] = useState(''); // let allows reassignment
    const [password, setPassword] = useState(''); // const restricts that ^
    const [fname, setFirstname] = useState('');
    const [lname, setLastname] = useState('');
    const [errorMsg, setErrorMsg] = useState<string>(); 

    let updateUsername = (e: SyntheticEvent) => {
        console.log('username field updated');
        //let username = (e.target as HTMLInputElement).value;
        setUsername((e.target as HTMLInputElement).value);
        console.log("username is: " + username);
    }

    let updatePassword = (e: SyntheticEvent) => {
        console.log('password field updated');
        //let password = (e.target as HTMLInputElement).value;
        setPassword((e.target as HTMLInputElement).value);
        console.log("password is: " + password);
    }

    let updateFirstname = (e: SyntheticEvent) => {
        console.log('First name field updated');
        //let username = (e.target as HTMLInputElement).value;
        setFirstname((e.target as HTMLInputElement).value);
        console.log("First name is: " + fname);
    }

    let updateLastname = (e: SyntheticEvent) => {
        console.log('Last name field updated');
        //let password = (e.target as HTMLInputElement).value;
        setLastname((e.target as HTMLInputElement).value);
        console.log("Last name is: " + lname);
    }
    
    let register = async (e: SyntheticEvent) => {
            
        e.preventDefault(); // prevent default event logic from running
        // like if you use form, prevent it from sending a GET request with params
        // because we want to control what the button does.


        if (!username || !password || !fname || !lname) {
            setErrorMsg("You must provide a username, password, firstname, lastname");
        }
        else {
            setErrorMsg('');
            try {
                let resp = await fetch('http://localhost:5000/notecard/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({username, password, fname, lname})
                });
                
                if (Math.floor(resp.status/100) !== 2) {
                    setErrorMsg("Could not validate provided credentials!")
                    let data = await resp.json();
                    setErrorMsg(data.message);

                } else {
                    let data = await resp.json();
                    props.setCurrentUser(data); 
                }   
            } catch(err) {
                console.log(err);
                setErrorMsg("There was an error communicating with the API");
            } 
        }
    }
    
    return ( 

        props.currentUser ? //<p>You're already logged in, redirecting you to Dashboard</p> : 
        <Navigate to="/dashboard"/> :
        // show dashboard instead of this <p> tag content

    <>
        <h4>Please enter registration details</h4>
        <Box
            component="form"
            sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <div>
                    <TextField
                        id="un-registration"
                        label="myusername@revature.net"
                        type="Email"
                        onChange={updateUsername}
                    />
                </div>

                <div>
                    <TextField
                        id="fn-registration"
                        label="First Name"
                        type="text"
                        onChange={updateFirstname}
                    />
                </div>

                <div>
                    <TextField
                        id="ln-registration"
                        label="Last Name"
                        type="text"
                        onChange={updateLastname}
                
                    />
                </div>

                <div>
                    <TextField
                        id="password-registration"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        //helperText="Password must include: "
                        onChange={updatePassword}
                    />
                </div>

                <br/>
                <button id="register-button" onClick={register}>Register</button>
                <br/>
            </div>
            { errorMsg ? // ternary op
                // <div>
                //     <p className="alert">{errorMsg}</p>
                // </div>
                <ErrorMessage errorMessage = {errorMsg}></ErrorMessage>
                : // if falsey
                <></>
            }
        </Box>
      </>);
}

export default Register;
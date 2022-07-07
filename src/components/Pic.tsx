import { Box, TextField, Button } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { User } from "../models/user"
import ErrorMessage from "./ErrorMessage";




interface ILoginProps {
    // An Interface is used here as it's most appropriate


    currentUser: User | undefined | null,  // union type
    // the imported User class

    // A function that takes User type as input and outputs nothing
    setCurrentUser: (nextUser: User) => void
}

function Pic(props: ILoginProps) {

    const [pic, setPic] = useState<string>();
    const [errorMsg, setErrorMsg] = useState<string>();

    let updatePic = (e: SyntheticEvent) => {
        setPic((e.target as HTMLInputElement).value);
    }
    
    let sendPic = async (e: SyntheticEvent) => {
            
        e.preventDefault(); // prevent default event logic from running
        // like if you use form, prevent it from sending a GET request with params
        // because we want to control what the button does.


        if (!pic) { // If any input field is blank,
            setErrorMsg("URL required");
        } // if either field was blank, server won't be contacted
        else {
            let token = '';
            if (props.currentUser && props.currentUser.token) {
                token = props.currentUser.token;
            }
            setErrorMsg(''); // remove any error currently displayed
            try {
                // await means that "resp" variable is the response, rather than a promise
                let resp = await fetch('http://notecardapi-env.eba-psis3xqw.us-east-1.elasticbeanstalk.com'+
                                       '/notecard/pic', // API endpoint
                    {
                        method: 'POST', 
                        headers: { 
                            'Content-Type': 'application/json',
                            'Authorization': token
                        },
                        body: JSON.stringify({pic})
                        // packages up the pic URL
                    }
                );
                // The server has sent back a response code... 
                if (Math.floor(resp.status/100) !== 2) { // if that code is not a 200, 204, 2-whatever
                    setErrorMsg("Could not validate provided credentials!"); //  
                    let data = await resp.json(); // The database sends errors in text format
                    setErrorMsg(data.message);            // that text is displayed

                } 
                if (Math.floor(resp.status/100) === 2) {
                    if (props.currentUser) {
                        props.setCurrentUser({
                            authUserId: props.currentUser.authUserId,
                            authUserRole: props.currentUser.authUserRole,
                            authUsername: props.currentUser.authUsername,
                            token: props.currentUser.token
                        } as unknown as User);
                    }
                }
            } catch(err) { // This will run in situations like the API was not running
                setErrorMsg("There was an error communicating with the API");
            } 
        }
    }


    return ( 
         !props.currentUser ? 
         <Navigate to="/login"/> :
        <>

            <h1 style={{ color: "#374d70", fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", textAlign: "center"}}>Profile Pic Setter</h1>
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
                        id="pic"
                        label="Picture URL"
                        type="text"
                        onChange={updatePic}
                    />
                </div>

                { errorMsg ? // ternary op
                                <ErrorMessage errorMessage = {errorMsg}></ErrorMessage>
                                : // if falsey
                                <><br/></>
                }
                <Button id="pic-button" onClick={sendPic} variant="contained">Set Picture</Button>
                <br/><br/><br/>
            </div>
        </Box>
        
        </>
    )
}

export default Pic;

import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { SyntheticEvent, useState } from "react";
import { Navigate } from "react-router-dom"
import { User } from "../models/user"
import ErrorMessage from "./ErrorMessage";

interface INewCardProps {
    currentUser: User | undefined | null
}

function NewDeck(props: INewCardProps) {

    const [deckname, setName] = useState('');
    const [errorMsg, setErrorMsg] = useState<string>();


    let deckName = (e: SyntheticEvent) => {
        setName((e.target as HTMLInputElement).value);
    }


    let createDeck = async (e: SyntheticEvent) => {
        e.preventDefault();

        if (!deckname) {
            setErrorMsg("Deckname required")
        } else {
            setErrorMsg('');
            let token = "";
            if (props.currentUser && props.currentUser.token) {
                token = props.currentUser.token
            }
            try {
                let resp = await fetch('http://notecardapi-env.eba-psis3xqw.us-east-1.elasticbeanstalk.com/notecard/deck/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    body: JSON.stringify({deckname})
                });
                if (Math.floor(resp.status/100) != 2) {
                    setErrorMsg('Could not create new Deck')
                    let data = await resp.json();
                    setErrorMsg(data.message);
                } else {
                    // let data = await resp.json();
                    // console.log(data);
                    setErrorMsg('Deck created');
                }
            } catch(err) {
                setErrorMsg('There was an error communicating with the API');
                console.log(err);
            }
        }
    }

    return (
        !props.currentUser ? 
         <Navigate to="/login"/> :
        <>
            <Box
                id="deck-create"
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
                        <h3 className="create-title">Enter Name of New Deck</h3>
                        <TextField
                            id="newDeck"
                            label="New Deck Name"
                            type="text"
                            onChange={deckName}
                        />
                    </div>
                        <Button id="createButton" onClick={createDeck} variant="contained" sx= {{background: "#263238"}}>Create</Button>
                    
                    { errorMsg ?
                        <ErrorMessage errorMessage= {errorMsg}></ErrorMessage>
                        :
                        <><br/></>
                    }
                </div>

            </Box>
        
        </>
    )
}

export default NewDeck;

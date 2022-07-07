import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { SyntheticEvent, useState } from "react";
import { Navigate } from "react-router-dom"
import { User } from "../models/user"
import ErrorMessage from "./ErrorMessage";

interface INewCardProps {
    currentUser: User | undefined | null
}

function NewCard(props: INewCardProps) {
    const [html_q, setHtml_q] = useState('');
    const [html_a, setHtml_a] = useState('');
    const [creator_id, setCreator_id] = useState<number>();
    const [errorMsg, setErrorMsg] = useState<string>();


    let newQuestion = (e: SyntheticEvent) => {
        setHtml_q((e.target as HTMLInputElement).value);
    }

    let newAnswer = (e: SyntheticEvent) => {
        setHtml_a((e.target as HTMLInputElement).value);
    }

    let createCard = async (e: SyntheticEvent) => {
        e.preventDefault();
        setCreator_id(props.currentUser?.authUserId)

        if (!html_q || !html_a) {
            setErrorMsg("Notecard Question and Answer are required to create a new notecard.")
        } else {
            setErrorMsg('');
            let token = "";
            if (props.currentUser && props.currentUser.token) {
                token = props.currentUser.token
            }
            try {
                let resp = await fetch('http://localhost:5000/notecard/card/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    body: JSON.stringify({html_q, html_a, creator_id})
                });
                if (Math.floor(resp.status/100) != 2) {
                    setErrorMsg('Could not create new Notecard')
                    let data = await resp.text();
                    setErrorMsg(data);
                } else {
                    // let data = await resp.json();
                    // console.log(data);
                    setErrorMsg('Card created');
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
                id="card-create"
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
            >
                <br />
                <div>
                    <div>
                        <h3 className="create-title">Enter a new card question</h3>
                        <TextField
                            id="newQuestion"
                            label="New Card Question"
                            type="text"
                            onChange={newQuestion}
                        />
                    </div>
                    <div>
                        <h3 className="create-title">Enter a new card answer</h3>
                        <TextField
                                id="newAnswer"
                                label="New Card Answer"
                                type="text"
                                onChange={newAnswer}
                        />
                    </div>
                        <Button id="createButton" onClick={createCard} variant="contained">Create</Button>
                    
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

export default NewCard;
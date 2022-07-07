import { Box, Button, TextField, Typography } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { deckForDeckView } from "../dtos/deckForDeckView";
import { Link } from "react-router-dom";

interface ICurrentSelectionProps {
    currentSelection: string | undefined | null,
    setCurrentSelection: (nextSelection: string) => void
}

function DeckView(props: ICurrentSelectionProps) {

    const [decks, setDecks] = useState([] as deckForDeckView[]);
    const [deckSelection, setDeckSelection] = useState<string>();

    let userSelection: string;

    // userSelection = deckSelection;

    const deckColumns: GridColDef[] = [
        { field: 'id', headerName: 'Deck ID', width: 70},
        { field: 'owner_id', headerName: 'Owner ID', width: 90 },
        { field: 'numOfCards', headerName: 'Cards', width: 70},
        { field: 'deck_name', headerName: 'Deck Name', width: 300}
        
    ];
    
    let UpdateSelection= (e: SyntheticEvent) => {
        userSelection = ((e.target as HTMLInputElement).value);
        
    }

    let ViewDeck = (e: SyntheticEvent) => {
        return(
            props.setCurrentSelection(userSelection)
            
            
            //TODO: implement navigate to flashcard, passing user selection to flashcard component
        )
    }

    useEffect(() => {

        fetch('http://notecardapi-env.eba-psis3xqw.us-east-1.elasticbeanstalk.com/notecard/deck/view') // GET by default
            .then(resp => resp.json())  // return keyword is implicit
            .then(data => setDecks(data as unknown as deckForDeckView[]));
        return () => {
            console.log('the dashboard component was derendered');
        }
    }, []);

    return ( 
        <>

            <h1 style={{ color: "#374d70", fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", textAlign: "center"}}>Decks</h1>
            <br/>
            <div id="deckGrid">
                <DataGrid sx={{
                        height: 400,
                        boxShadow: 2,
                        border: 2,
                        borderColor: 'white',
                    }}

                rows={decks}
                columns={deckColumns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                />
                <br/>
            </div>
            <Box
                component="form"
                sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                >
                    <div className="deckField">
                        <TextField
                            id="DeckSelect"
                            label="Selected Deck ID"
                            type="text"
                            onChange={UpdateSelection}
                        />
                    </div>
                    <br/>
                    <Link to="/flashcards"><Button id="addToDeckButton" onClick={ViewDeck} variant="contained" sx={{background: "#263238", marginLeft: "5%"}}>View Selected Deck</Button></Link>
                </Box>
        </> 
    )
}

export default DeckView;

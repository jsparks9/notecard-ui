import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { SyntheticEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cardsForCardView } from "../dtos/cardsForCardView";
import ErrorMessage from "./ErrorMessage";

function CardView() {

    const [cards, setCards] = useState([] as cardsForCardView[]);
    const [card_id, setCard_id] = useState<string>();
    const [deck_id, setDeck_id] = useState<string>();
    const [errorMsg, setErrorMsg] = useState<string>();

    const cardColumns: GridColDef[] = [
        {field: 'id', headerName: 'Card ID', width: 100},
        {field: 'html_q', headerName: 'Notecard Question', width: 600},
        {field: 'html_a', headerName: 'Notecard Answer', width: 950}
    ];

    let AddToDeck = async (e: SyntheticEvent) => {
        e.preventDefault();
        
        if (!card_id || !deck_id) {
            setErrorMsg("Card and Deck IDs required");
        } else {
            try {
                let resp = await fetch('http://notecardapi-env.eba-psis3xqw.us-east-1.elasticbeanstalk.com/notecard/card/carddeck', 
                    {
                        method: 'POST', 
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({card_id, deck_id})
                    }
                ); 
                if (Math.floor(resp.status/100) !== 2) { 
                    setErrorMsg("Could not add card to deck"); //  
                    let data = await resp.text(); 
                    setErrorMsg(data);            

                } else {
                    setErrorMsg("Card added to deck")
                }   
            } catch(err) { 
                setErrorMsg("There was an error communicating with the API");
            } 
            
        }
        
    }

    let UpdateCardSelection= (e: SyntheticEvent) => {
        setCard_id((e.target as HTMLInputElement).value);
        console.log(card_id);
        
    }
    let UpdateDeckSelection= (e: SyntheticEvent) => {
        setDeck_id((e.target as HTMLInputElement).value);
        console.log(deck_id);
        
    }

    useEffect(() => {

        fetch('http://notecardapi-env.eba-psis3xqw.us-east-1.elasticbeanstalk.com/notecard/card/view')
            .then(resp => resp.json())
            .then(data => setCards(data as unknown as cardsForCardView[]));
        return () => {
            console.log('the dashboard component was derendered');
            
        }
    }, []);

    return (
        <>
            <h1 style={{ color: "#374d70", fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", textAlign: "center"}}>Cards</h1>
            <br/>
            <div id="cardGrid">
                <DataGrid sx= {{
                    height: 500,
                    boxShadow: 2,
                    border: 2,
                    borderColor: 'white',
                }}
                rows= {cards}
                columns={cardColumns}
                pageSize={8}
                rowsPerPageOptions={[8]}
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
                    <div className="cardField">
                        <TextField
                            id="cardSelect"
                            label="Selected Card ID"
                            type="text"
                            onChange={UpdateCardSelection}
                        />
                        <TextField
                            id="deckSelect"
                            label="Desired Deck ID"
                            type="text"
                            onChange={UpdateDeckSelection}
                        />
                    </div>
                    <br/>
                    <Button id="addToDeckButton" onClick={AddToDeck} variant="contained" sx={{background: "#263238", marginLeft: "5%"}}>Add Card to Deck</Button>
                    <Link to ="/createCard"><Button id="createNewCardButton" variant="contained" sx={{background: "#263238", marginLeft: "1%"}}>Create new Card</Button></Link>
                    <div className="cardError">
                    { errorMsg ? // ternary op
                                <ErrorMessage errorMessage = {errorMsg}></ErrorMessage>
                                : // if falsey
                                <><br/></>
                }
                </div>
                </Box>


        </>
    )

}

export default CardView;
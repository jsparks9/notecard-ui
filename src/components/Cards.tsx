import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { SyntheticEvent, useEffect, useState } from "react";
import { cardsForCardView } from "../dtos/cardsForCardView";

function CardView() {

    const [cards, setCards] = useState([] as cardsForCardView[]);
    const [selection, setSelection] = useState<string>();

    const cardColumns: GridColDef[] = [
        {field: 'id', headerName: 'Card ID', width: 100},
        {field: 'creator_id', headerName: 'Creator ID', width: 100},
        {field: 'card_q', headerName: 'Notecard Question', width: 600},
        {field: 'card_a', headerName: 'Notecard Answer', width: 950}
    ];

    let AddToDeck = (e: SyntheticEvent) => {
        return(
            console.log("temp")
            //TODO: implement add card to deck, waiting on api branch to merge to main
        )
    }

    let UpdateSelection= (e: SyntheticEvent) => {
        setSelection((e.target as HTMLInputElement).value);
    }

    useEffect(() => {

        fetch('http://localhost:5000/notecard/card/view')
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
                    <div className="cardField">
                        <TextField
                            id="cardSelect"
                            label="Selected Card ID"
                            type="text"
                            onChange={UpdateSelection}
                        />
                        <TextField
                            id="deckSelect"
                            label="Desired Deck ID"
                            type="text"
                            onChange={UpdateSelection}
                        />
                    </div>
                    <br/>
                    <Button id="addToDeckButton" onClick={AddToDeck} variant="contained" sx={{background: "#263238", marginLeft: "5%"}}>Add Card to Deck</Button>
                    
                </Box>


        </>
    )

}

export default CardView;
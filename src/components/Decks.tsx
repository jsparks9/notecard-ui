import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { deckForDeckView } from "../dtos/deckForDeckView";


function DeckView() {

    const [decks, setDecks] = useState([] as deckForDeckView[]);

    const deckColumns: GridColDef[] = [
        { field: 'id', headerName: 'Deck ID', width: 70},
        { field: 'owner_id', headerName: 'Owner ID', width: 90 },
        { field: 'numOfCards', headerName: 'Cards', width: 70},
        { field: 'deck_name', headerName: 'Deck Name', width: 300}
        
    ];

    useEffect(() => {

        fetch('http://localhost:5000/notecard/deck/view') // GET by default
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
                checkboxSelection
                />
                <br/>
            </div>
        </> 
    )
}

export default DeckView;

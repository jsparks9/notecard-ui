import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { User } from "../models/user"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Cards } from "../models/cards";
import { Decks } from "../models/decks";



interface IDashboardProps {
    currentUser: User | undefined
}

function Dashboard(props: IDashboardProps) {

    const [users, setUsers] = useState([] as User[]); 
    const [cards, setCards] = useState([] as Cards[]);
    const [decks, setDecks] = useState([] as Decks[]);
    //const [users, setUsers] = useState<User[]>([]); // also works
    
    const cardColumns: GridColDef[] = [

        { field: 'id', headerName: 'ID', width: 70, headerAlign: "center", align:"center" },
        { field: 'html_q', headerName: 'Question', width: 500, headerAlign: "center", align: "center"  },
        { field: 'html_a', headerName: 'Answer', width: 1200, headerAlign: "center", align: "center"}

      ];

    const deckColumns: GridColDef[] = [
        { field: 'deck_id', headerName: 'Deck ID', width: 70},
        { field: 'owner_id', headerName: 'Owner ID', width: 300 },
        { field: 'deckname', headerName: 'Deck Name', width: 300},
        { field: 'numOfCards', headerName: 'Number of Cards', width: 300}
    ];

    const deckOptions = [
        {label: 'Add selected to deck: ', value: "Deck Name"}
    ]





    //last lecture of Thursday on JSX and lifecycle
    useEffect(() => {
        console.log('the dashboard component was rendered');

        fetch('http://localhost:5000/notecard/auth/data/cards') // GET by default
            .then(resp => resp.json())  // return keyword is implicit
            .then(data => setCards(data as unknown as Cards[]));

        // fetch('http://localhost:5000/notecard/auth/data/decks') // GET by default
        //     .then(resp => resp.json())  // return keyword is implicit
        //     .then(data => setDecks(data as unknown as Decks[]));


        return () => {
            console.log('the dashboard component was derendered');
        }
    }, []);

    console.log(props.currentUser);

    return ( 
         !props.currentUser ? 
         <Navigate to="/login"/> :
        <>

            <h1 style={{ color: "#374d70", fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", textAlign: "center"}}>Dashboard</h1>
            <Typography variant="subtitle1" className="table-name">Notecards</Typography>
            <div id="notecardGrid">
                <DataGrid  sx={{
                        height: 400,
                        boxShadow: 2,
                        border: 2,
                        borderColor: 'white',
                    }}

                rows={cards}
                columns={cardColumns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                />
            </div>
            <div>
                <button id="create-card">Create a new card</button>
            </div>
            <div>
                <select id="addCardSelect">
                    {deckOptions.map((option) => (
                        <option value={option.value}>{option.label}</option>))}
                    </select>
                <button id="addCardButton">Add</button>
            </div>        
            <br/>

            <Typography variant="subtitle1" className="table-name">Decks</Typography>
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

export default Dashboard;

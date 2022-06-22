import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { User } from "../models/user"
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
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
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'html_q', headerName: 'Question', width: 300 },
        { field: 'html_a', headerName: 'Answer', width: 300}
      ];

    const deckColumns: GridColDef[] = [
        { field: 'deck_id', headerName: 'Deck ID', width: 70},
        { field: 'owner_id', headerName: 'Owner ID', width: 300 },
        { field: 'deckname', headerName: 'Deck Name', width: 300},
        { field: 'numOfCards', headerName: 'Number of Cards', width: 300}
    ];





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



    return ( 
        !props.currentUser ? //<p>You're not logged in</p> :
        <Navigate to="/login"/> :
        // now, going to /notecard/dashboard without being logged sends user to login
        <>
            <h1>Welcome, {props.currentUser.fname}</h1>
            <Typography variant="subtitle1">Notecards</Typography>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                rows={cards}
                columns={cardColumns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                />
            </div>

            <br/>

            <Typography variant="subtitle1">Decks</Typography>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                rows={decks}
                columns={deckColumns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                />
            </div>
            {/* <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Role ID</th>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, idx) => {
                        return (<tr key={idx}> 
                            <td>{user.id}</td>
                            <td>{user.role_id}</td>
                            <td>{user.username}</td>
                            <td>{user.fname}</td>
                            <td>{user.lname}</td>
                        </tr>)
                    })}
                </tbody>
            </table> */}
        </> 
    )
}

export default Dashboard;
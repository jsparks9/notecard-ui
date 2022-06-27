import { Box, TextField, Typography } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { User } from "../models/user"
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import ErrorMessage from "./ErrorMessage";


interface IDashboardProps {
    currentUser: User | undefined
}

function AdminView(props: IDashboardProps) {
    const [username, setUsername] = useState(''); // let allows reassignment
    const [users, setUsers] = useState([] as User[]); 
    const [errorMsg, setErrorMsg] = useState<string>();
    // Need STATE for ban var
    
    let updateBan = (e: SyntheticEvent) => {
        console.log('ban field updated');

        // want to update the BAN variable
        //setUsername((e.target as HTMLInputElement).value);

    }

    let ProcessBanButtonClick = (e: SyntheticEvent) => {
        console.log( "Ban button was clicked");
        e.preventDefault(); // prevent default event logic from running
            // like if you use form, prevent it from sending a GET request with params
            // because we want to control what the button does.

        // Send DELETE request
        
    }
   
    let DeleteUsername = (e: SyntheticEvent) => {
        console.log('username field deleted');
        //let username = (e.target as HTMLInputElement).value;
        let usernameForDeletion = (e.target as HTMLInputElement).value;
        console.log("username to delete: " + usernameForDeletion)
        // make a fetch call to the DELETE user endpoint (DELETE request to /users) 
        // with the username that needs to be removed from the DB
       
    }
   
   
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'role_id', headerName: 'Role ID', width: 70 },
        { field: 'fname', headerName: 'First name', width: 130 },
        { field: 'lname', headerName: 'Last name', width: 130 },
        { field: 'username', headerName: 'Username', width: 260 },
      ];



    //last lecture of Thursday on JSX and lifecycle
    useEffect(() => {
        console.log('the dashboard component was rendered');
        fetch('http://localhost:5000/notecard/auth/data/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }) .then(resp => resp.json())  // return keyword is implicit
        .then(data => setUsers(data))
    }, []);

    return ( 
        !props.currentUser ? //<p>You're not logged in</p> :
        <Navigate to="/login"/> :
        
        <>
            <h4>Delete user by UserName</h4>
            <Box
            component="form"
            sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
                <div>
                    <TextField
                        id="ban-field"
                        label="User to Delete"
                        type="Email"
                        onChange={updateBan}
                    />
                </div>
                <br/>
                <button id="delete-button" onClick={DeleteUsername} 
                >Ban User</button>
                <br/>
                { errorMsg ? // ternary op
                    // <div>
                    //     <p className="alert">{errorMsg}</p>
                    // </div>
                    <ErrorMessage errorMessage = {errorMsg}></ErrorMessage>
                    : // if falsey
                    <></>
                }
            </Box>


            <h1>Welcome, {props.currentUser.fname}</h1>
            <Typography variant="subtitle1">Notecard Users</Typography>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={users}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>
        </>
    )
}

export default AdminView;

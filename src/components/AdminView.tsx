import { Box, TextField, Typography } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { User } from "../models/user"
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import ErrorMessage from "./ErrorMessage";
import { UserForAdminView } from "../dtos/userForAdminView";


interface IDashboardProps {
    currentUser: User | undefined
}

function AdminView(props: IDashboardProps) {

    const [users, setUsers] = useState([] as UserForAdminView[]); 
    const [errorMsg, setErrorMsg] = useState<string>();
    const [username, setUsername] = useState<string>();
    const [role, setRole] = useState<string>();
    // Need STATE for ban var
    
    let updateBan = (e: SyntheticEvent) => {
        console.log('ban field updated');
        setUsername((e.target as HTMLInputElement).value);
        console.log("username outside useEffect is : " + setUsername); // doesn't work as expected
        console.log("Setting username");
        // want to update the BAN variable
        //setUsername((e.target as HTMLInputElement).value);

    }

    let updateRole = (e: SyntheticEvent) => {
        console.log('role updated');
        setRole((e.target as HTMLInputElement).value);
        
       

    }

    useEffect(() => {
        console.log("username is now " + username) // works as expected
    }, [username])

    let ProcessBanButtonClick = (e: SyntheticEvent) => {
        console.log( "Update button was clicked");
        e.preventDefault(); // prevent default event logic from running
            // like if you use form, prevent it from sending a GET request with params
            // because we want to control what the button does.

        // Send DELETE request


        
    }
   


    let UpdateUser = async (e: SyntheticEvent) => {
        e.preventDefault();
        console.log('Update Button clicked. username to update is: '+username + " and role is: " + role);
        //let username = (e.target as HTMLInputElement).value;
        let usernameForDeletion1 = (e.target as HTMLInputElement).value; // Instead of local var, let's use State
        
        // make a fetch call to the DELETE user endpoint (DELETE request to /users) 
        // with the username that needs to be removed from the DB
      
        setErrorMsg('');
        try {
            let resp = await fetch('http://localhost:5000/notecard/adminview/setrole', { // endpoint in API that receives DELETE requests
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication' : 'EmptyTokenForNow'
                },
                body: JSON.stringify({username, role})
            });
            
            if (resp.status < 200 || 299 < resp.status) { // If NOT in 200-range
                setErrorMsg("Could not validate provided credentials!")
                let data = await resp.json();
                setErrorMsg(data.message);

            }; 
            if (resp.status == 204) {
                refreshUserList();
                setErrorMsg("User was successfully updated!");
            } else {
                let data = await resp.json();
                setErrorMsg("Resp code was 200-something but not a 204???"); // shouldn't show
                
            }   
        } catch(err) {
            setErrorMsg("There was an error communicating with the API");
        } 
    }
   
   
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'role', headerName: 'Role', width: 130 },
        { field: 'fname', headerName: 'First name', width: 130 },
        { field: 'lname', headerName: 'Last name', width: 130 },
        { field: 'username', headerName: 'Username', width: 260 },
      ];


      function refreshUserList() {
        fetch('http://localhost:5000/notecard/adminview', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authentication' : 'EmptyTokenForNow'
            }
        }) .then(resp => resp.json())  // return keyword is implicit
        .then(data => setUsers(data))
      }

    //last lecture of Thursday on JSX and lifecycle
    useEffect(() => {
        refreshUserList();
    }, []);

    return ( 
        // !props.currentUser ? //<p>You're not logged in</p> :
        // <Navigate to="/login"/> :
        
        <>
            <h4>Ban user by ID or UserName</h4>
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
                    label="User to Update"
                    type="Email"
                    onChange={updateBan}
                />
                <TextField
                    id="role-field"
                    label="New Role"
                    type="text"
                    onChange={updateRole}
                />
                </div>
                
                <br/>
                <button id="ban-button" onClick={UpdateUser} 
                >Update</button>
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


            {/* <h1>Welcome, {props.currentUser.fname}</h1> */}
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

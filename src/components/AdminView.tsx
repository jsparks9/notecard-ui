import { Box, TextField, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { SyntheticEvent, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { User } from "../models/user"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
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
    
    let updateBan = (e: SyntheticEvent) => {
        setUsername((e.target as HTMLInputElement).value);
    }

    let updateRole = (e: SyntheticEvent) => {
        setRole((e.target as HTMLInputElement).value);
    }

    useEffect(() => { setErrorMsg(''); }, [username, role])

    let UpdateUser = async (e: SyntheticEvent) => {
        e.preventDefault();
        
        if (!username || !role) {
            setErrorMsg('Username and role required');
            return;
        }
        setErrorMsg('');
        try {
            let resp = await fetch('http://notecardapi-env.eba-psis3xqw.us-east-1.elasticbeanstalk.com/notecard/adminview/setrole', { // endpoint in API that receives DELETE requests
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
                //setErrorMsg("Resp code was 200-something but not a 204???"); // shouldn't show
                setErrorMsg(data.message);
                
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
        fetch('http://notecardapi-env.eba-psis3xqw.us-east-1.elasticbeanstalk.com/notecard/adminview', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authentication' : 'EmptyTokenForNow'
            }
        }).then(resp => resp.json())  // return keyword is implicit
        .then(data => setUsers(data))
      }

    //last lecture of Thursday on JSX and lifecycle
    useEffect(() => {
        refreshUserList();
    }, []);

    return ( 
        !props.currentUser ? 
        <Navigate to="/login"/> :
        
        <>            
            {/* <h4 style={{ color: "#374d70", fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", textAlign: "left"}}>Update user by ID or UserName</h4> */}
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
                <Button id="ban-button" onClick={UpdateUser} variant="contained">Update</Button>
                
                { errorMsg ? // ternary op
                    <ErrorMessage errorMessage = {errorMsg}></ErrorMessage>
                    : 
                    <><br/><br/></>
                }
            </Box>


            {/* <h1>Welcome, {props.currentUser.fname}</h1> */}
            <Typography variant="subtitle1" style={{ color: "#374d70", fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontWeight:600}}>Notecard Users</Typography>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    style={{ color: "#374d70", 
                        fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", textAlign: "left"
                    }}
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

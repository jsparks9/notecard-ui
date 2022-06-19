import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { User } from "../models/user"
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';



interface IDashboardProps {
    currentUser: User | undefined
}

function Dashboard(props: IDashboardProps) {

    const [users, setUsers] = useState([] as User[]); 
    //const [users, setUsers] = useState<User[]>([]); // also works
    
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
        fetch('http://localhost:5000/notecard/auth/data/users') // GET by default
            .then(resp => resp.json())  // return keyword is implicit
            .then(data => setUsers(data as unknown as User[]));

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
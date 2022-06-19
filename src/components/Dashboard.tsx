import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { User } from "../models/user"


interface IDashboardProps {
    currentUser: User | undefined
}

function Dashboard(props: IDashboardProps) {

    const [users, setUsers] = useState([] as User[]); 
    //const [users, setUsers] = useState<User[]>([]); // also works
    
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
            <table>
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
            </table>
        </> 
    )
}

export default Dashboard;
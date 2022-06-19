import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { User } from "../models/user"


interface IDashboardProps {
    currentUser: User | undefined
}

function Dashboard(props: IDashboardProps) {

    //last lecture of Thursday on JSX and lifecycle
    useEffect(() => {
        console.log('the dashboard component was rendered');
        return (() => {
            console.log('the dashboard component was derendered');
        })
    })

    return ( 
        !props.currentUser ? //<p>You're not logged in</p> :
        <Navigate to="/login"/> :
        // now, going to /notecard/dashboard without being logged sends user to login
        <>
            <h1>Welcome, {props.currentUser.fname}</h1>
        </> 
    )
}

export default Dashboard;
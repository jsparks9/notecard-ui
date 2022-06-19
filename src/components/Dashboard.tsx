import { Navigate } from "react-router-dom";
import { User } from "../models/user"


interface IDashboardProps {
    currentUser: User | undefined
}

function Dashboard(props: IDashboardProps) {

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
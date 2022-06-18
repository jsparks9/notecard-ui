import { User } from "../models/user"


interface IDashboardProps {
    currentUser: User | undefined
}

function Dashboard(props: IDashboardProps) {

    return ( 
        !props.currentUser ? <p>You're not logged in</p> :
        <>
            <h1>Welcome, {props.currentUser.fname}</h1>
        </> 
    )
}
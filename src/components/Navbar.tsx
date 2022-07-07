import { AppBar, List, ListItem, ListItemText, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../models/user";

interface INavbarProps {
 currentUser: User | undefined,
 setCurrentUser: (nextUser: User | undefined) => void
}

// Conditional rendering for buttons  
function Navbar(props: INavbarProps) {

    const navigate = useNavigate();
    // allows routing

    async function logout() { 
        //await fetch('http://localhost:5000/notecard/auth', {method: 'DELETE'});
        props.setCurrentUser(undefined);
        navigate("/login");

    }

    // function goTo(route: string) { navigate(route); }

    return (<>
        <AppBar position="static" id="navbar" >
            <Toolbar sx={{background: "#263238", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"}}>
                <Typography >
                    <List component="nav" >
                        <ListItem>
                            <Typography variant="h4" >Notecard</Typography>
                            {
                                props.currentUser ? 
                                <> 
                                    <ListItemText inset>
                                        <Typography variant="h6" className="menu-items">
                                            <Link to="/dashboard">Dashboard</Link>
                                        </Typography>
                                    </ListItemText>
                                    
                                    {props.currentUser.authUserRole === "ADMIN" ?
                                    <ListItemText inset>
                                        <Typography variant="h6" className="menu-items">
                                            <Link to="/adminView">Admin</Link>
                                        </Typography>
                                    </ListItemText>:<></>}

                                    <ListItemText inset>
                                        <Typography variant="h6" className="menu-items">
                                            <Link to="/decks">Decks</Link>
                                        </Typography>
                                    </ListItemText>

                                    <ListItemText inset>
                                        <Typography variant="h6" className="menu-items">
                                            <Link to="/Cards">Cards</Link>
                                        </Typography>
                                    </ListItemText>

                                    <ListItemText inset >
                                        <Typography variant="h6" className="menu-items" onClick={logout}>
                                            <Link to="/login">Logout</Link>
                                        </Typography>
                                    </ListItemText>

                                </>
                                :
                                <>
                                    <ListItemText inset>
                                        <Typography variant="h6" className="menu-items">
                                            <Link to="/login">Login</Link>
                                        </Typography>
                                    </ListItemText>
                                    <ListItemText inset>
                                        <Typography variant="h6" className="menu-items">
                                            <Link to="/register">Register</Link>
                                        </Typography>
                                    </ListItemText>
                                </>
                            }
                        </ListItem>
                    </List>
                </Typography>
            </Toolbar>
        </AppBar>
        <AppBar position="static" id="placeholder">
            <Toolbar></Toolbar>
        </AppBar>
    </>)
}

export default Navbar;

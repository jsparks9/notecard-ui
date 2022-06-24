import { AppBar, css, IconButton, List, ListItem, ListItemText, Toolbar, Typography } from "@mui/material";
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
        await fetch('http://localhost:5001/notecard/auth', {method: 'DELETE'});
        props.setCurrentUser(undefined);
        navigate("/login");

    }

    function goTo(route: string) {
        navigate(route);
    }

    return (
        <AppBar position="static" id="navbar">
            <Toolbar>
                <Typography>
                    <List component="nav">
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
                                    <ListItemText inset>
                                        <Typography variant="h6" className="menu-items" onClick={logout}>Logout</Typography>
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
    )

}

export default Navbar;
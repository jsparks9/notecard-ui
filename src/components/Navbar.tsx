import { AppBar, css, List, ListItem, ListItemText, Toolbar, Typography } from "@mui/material";
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
        await fetch('http://localhost:5000/notecard/auth', {method: 'DELETE'});
        props.setCurrentUser(undefined);
        navigate("/login");

    }

    function goTo(route: string) {
        navigate(route);
    }

    return (
        <AppBar color="primary" position="static" style={{ background: '#42474d'}}>
            <Toolbar>
                <Typography variant="h2" color="inherit">
                    <List component="nav">
                        <ListItem>
                            <Typography variant="h4" color="inherit">Notecard</Typography>
                            {
                                props.currentUser ? 
                                <> 
                                    
                                    <ListItemText inset>
                                        <Typography variant="h6" color="inherit">
                                            <Link to="/dashboard">Dashboard</Link>
                                            </Typography>
                                    </ListItemText>
                                    <ListItemText inset>
                                        <Typography variant="h6" color="inherit" onClick={logout}>Logout</Typography>
                                    </ListItemText>
                                    
                                </>
                                :
                                <>
                                    <ListItemText inset>
                                        <Typography variant="h6" color="inherit">
                                            <Link to="/login">Login</Link>
                                            </Typography>
                                    </ListItemText>
                                    <ListItemText inset>
                                        <Typography variant="h6" color="inherit">
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
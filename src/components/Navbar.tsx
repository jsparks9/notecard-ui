import { AppBar, List, ListItem, ListItemText, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { User } from "../models/user";

interface INavbarProps {
 currentUser: User | undefined,
 setCurrentUser: (nextUser: User | undefined) => void
}

// Conditional rendering for buttons  
function Navbar(props: INavbarProps) {

    const navigate = useNavigate();
    // allows routing

    function logout() { 
        console.log('logout not implemented yet');
    }

    function goTo(route: string) {
        navigate(route);
    }

    return (
        <AppBar color="primary" position="static">
            <Toolbar>
                <Typography variant="h5" color="inherit">
                    <List component="nav">
                        <ListItem>
                            <Typography variant="h5" color="inherit">Notecard</Typography>
                            {
                                props.currentUser ? 
                                <> 
                                    <ListItemText inset>
                                        <Typography variant="h6" color="inherit" onClick={() => goTo('/dashboard')}>Dashboard</Typography>
                                    </ListItemText>
                                    <ListItemText inset>
                                        <Typography variant="h6" color="inherit" onClick={logout}>Logout</Typography>
                                    </ListItemText>
                                </>
                                :
                                <>
                                    <ListItemText inset>
                                        <Typography variant="h6" color="inherit" onClick={() => goTo('/login')}>Login</Typography>
                                    </ListItemText>
                                    <ListItemText inset>
                                        <Typography variant="h6" color="inherit" onClick={() => goTo('/register')}>Register</Typography>
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
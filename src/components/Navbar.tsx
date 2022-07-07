import { AppBar, List, ListItem, ListItemText, Toolbar, Typography } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../models/user";

interface INavbarProps {
 currentUser: User | undefined,
 setCurrentUser: (nextUser: User | undefined) => void
}

// Conditional rendering for buttons  
function Navbar(props: INavbarProps) {

    const navigate = useNavigate();
    const [pic, setPic] = useState('');
    // allows routing

    async function logout() { 
        //await fetch('http://localhost:5000/notecard/auth', {method: 'DELETE'});
        props.setCurrentUser(undefined);
        navigate("/login");

    }
    let refreshPic = (e: SyntheticEvent) => {
        setPic("");
        let token = "";
        if (props.currentUser && props.currentUser.token) {
            token = props.currentUser.token;
        }
        fetch('http://notecardapi-env.eba-psis3xqw.us-east-1.elasticbeanstalk.com'+
              '/notecard/pic', { // GET by default
              headers: {
                'Content-Type': 'application/json',
                'Authorization' : token
            }})
            .then(resp => resp.json())  // return keyword is implicit
            .then(data => setPic(data.pic as string));

    }


    useEffect(() => {
        setPic("");
        let token = "";
        if (props.currentUser && props.currentUser.token) {
            token = props.currentUser.token;
        }
        fetch('http://notecardapi-env.eba-psis3xqw.us-east-1.elasticbeanstalk.com'+
              '/notecard/pic', { // GET by default
              headers: {
                'Content-Type': 'application/json',
                'Authorization' : token
            }})
            .then(resp => resp.json())  // return keyword is implicit
            .then(data => setPic(data.pic as string));

        // fetch('http://localhost:5000/notecard/auth/data/decks') // GET by default
        //     .then(resp => resp.json())  // return keyword is implicit
        //     .then(data => setDecks(data as unknown as Decks[]));


        return () => {}
    }, [props.currentUser]);

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
                                    { pic ?
                                    <ListItemText inset>
                                        <img alt="Profile Pic" 
                                            src={`${pic}`} 
                                            style={{ height: "100%", width:"30px" }} 
                                        /> </ListItemText>
                                        : 
                                        <ListItemText inset>
                                        <Typography variant="h6" className="menu-items">
                                            <Link to="/picsetter">Set Pic</Link>
                                        </Typography>
                                    </ListItemText>
                                    }                                    
                                    {/* <ListItemText inset>
                                        <Typography variant="h6" className="menu-items">
                                            <Link to="/dashboard">Dashboard</Link>
                                        </Typography>
                                    </ListItemText> */}
                                    
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
                                            <Link to="/createDeck">Create Deck</Link>
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

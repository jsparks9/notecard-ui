import { SyntheticEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import { User } from "../models/user";
import ErrorMessage from "./ErrorMessage";

interface ILoginProps {
    // fields any methods : interface is most appropriate

    currentUser: User | undefined | null,  // union type

    // update function
    setCurrentUser: (nextUser: User) => void
}


function Login(props: ILoginProps) { // or any instead of {}, placeholder for now
    // can't have 2 top-level element
    // can put two divs in a fragment

        // use destructuring assignment
        const [username, setUsername] = useState(''); // let allows reassignment
        const [password, setPassword] = useState(''); // const restricts that ^
        const [errorMsg, setErrorMsg] = useState<string>(); // same as ^, but using TS-provided generics
        //const [authUser, setAuthUser] = useState(undefined as unknown as User);
        
        // this state is effectively immutable 
        // so, cannot update directly like 
            // let username = 'something';
        // must instead use setters

        // let username = '';
        // let password = '';

        let updateUsername = (e: SyntheticEvent) => {
            console.log('username field updated');
            //let username = (e.target as HTMLInputElement).value;
            setUsername((e.target as HTMLInputElement).value);
            console.log("username is: " + username);
        }

        let updatePassword = (e: SyntheticEvent) => {
            console.log('password field updated');
            //let password = (e.target as HTMLInputElement).value;
            setPassword((e.target as HTMLInputElement).value);
            console.log("password is: " + password);
        }
        
        let login = (e: SyntheticEvent) => {
            
            e.preventDefault(); // prevent default event logic from running
            // like if you use form, prevent it from sending a GET request with params
            // because we want to control what the button does.

            if (!username || !password) {
                setErrorMsg("You must provide a username and password");
            }
            else {
                setErrorMsg('');

                let respData = fetch('http://localhost:5000/notecard/auth', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({username, password})
                }).then(resp => {
                    console.log(`Response status: ${resp.status}`);
                    console.log(`Response timestamp: ${Date.now()}`);

                    if (Math.floor(resp.status/100) !== 2) {
                        setErrorMsg('Could not validate credetials');
                    } 
                    return resp.json(); // returns a promise
                
                }).catch(err => {
                    setErrorMsg("There was a problem comminicating with the API");
                })

                if (respData) {
                    respData.then(data => {
                        console.log('Response data:');
                        console.log(data); 
                        props.setCurrentUser(new User(
                                            (Number) (`${data['id']}`),
                                            (Number) (`${data['role_id']}`),
                                                      `${data['username']}`,
                                                      `${data['fname']}`,
                                                      `${data['lname']}`,
                                                      `${data['password']}`)); 
                        console.log(props.currentUser?.fname);


                    })

                }
        
            }
        }
        console.log("Try #2");
        console.log(props.currentUser);
    return ( // this is a fragment
    
        props.currentUser ? //<p>You're already logged in, redirecting you to Dashboard</p> : 
        <Navigate to="/dashboard"/> :
        // show dashboard instead of this <p> tag content
        <> 
            <h4>Login to Notecard</h4>
            <div id="login-form">
            <input type="email" id="username" placeholder="user@Revature.net" onChange={updateUsername}></input>
            <br/><br/>
            <input type="password" id="login-password" placeholder="Password" onChange={updatePassword}></input>
            <br/><br/>
            <button id="login-button" onClick={login}>Login</button>
            <br/><br/>
            </div>
            { errorMsg ? // ternary op
                // <div>
                //     <p className="alert">{errorMsg}</p>
                // </div>
                <ErrorMessage errorMessage = {errorMsg}></ErrorMessage>
                : // if falsey
                <></>
            }
        </> // need to render it somewhere
    )

}

export default Login;
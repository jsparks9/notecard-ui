import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import { User } from './models/user';

function App() {

  const [authUser, setAuthUser] = useState<User>();

  return (
    <>
      <Login currentUser={authUser} setCurrentUser={setAuthUser}/>
      {
        authUser ? <p>Logged you in, {authUser.fname}</p> : <></>
      }
    </>
  );
}

export default App;

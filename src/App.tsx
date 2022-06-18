import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import { User } from './models/user';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';

function App() {

  const [authUser, setAuthUser] = useState<User>();

  return (
    <Routes>
      <Route path="/login" element={<Login currentUser={authUser} setCurrentUser={setAuthUser} />}/>
      <Route path='/dashboard'  element={<Dashboard currentUser={authUser}/>}/>
    </Routes>


    // <>
    //   <Login currentUser={authUser} setCurrentUser={setAuthUser}/>
    //   {
    //     authUser ? <p>Logged you in, {authUser.fname}</p> : <></>
    //   }
    // </>
  );
}

export default App;

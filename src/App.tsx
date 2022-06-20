import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import { User } from './models/user';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Register from './components/Register';

function App() {

  const [authUser, setAuthUser] = useState<User>(); // undefined as unknown as User

  return (
    <>
      <Navbar currentUser={authUser} setCurrentUser={setAuthUser} />
      <Routes>
        <Route path="/login" element={<Login currentUser={authUser} setCurrentUser={setAuthUser} />}/>
        <Route path='/dashboard'  element={<Dashboard currentUser={authUser}/>}/>
        <Route path='/register'  element={<Register currentUser={authUser} setCurrentUser={setAuthUser}/>}/>
      </Routes>
    </>

    // <>
    //   <Login currentUser={authUser} setCurrentUser={setAuthUser}/>
    //   {
    //     authUser ? <p>Logged you in, {authUser.fname}</p> : <></>
    //   }
    // </>
  );
}

export default App;

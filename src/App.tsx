import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import { User } from './models/user';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Register from './components/Register';
import AdminView from './components/AdminView';

function App() {
  
  const [authUser, setAuthUser] = useState<User>(); // undefined as unknown as User
  const [token, setToken] = useState<string>();

  return (
    <>
      <Navbar currentUser={authUser} setCurrentUser={setAuthUser} />
      <Routes>
        <Route path="/login" element={<Login currentUser={authUser} setCurrentUser={setAuthUser}/>}/>
        <Route path='/dashboard'  element={<Dashboard currentUser={authUser}/>}/>
        <Route path='/adminView'  element={<AdminView currentUser={authUser}/>}/>
        <Route path='/register'  element={<Register currentUser={authUser} setCurrentUser={setAuthUser}/>}/>
      </Routes>
    </>
  );
}

export default App;

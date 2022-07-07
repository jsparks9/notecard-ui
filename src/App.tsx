import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import { User } from './models/user';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Register from './components/Register';
import AdminView from './components/AdminView';
import DeckView from './components/Decks';
import CreateCard from './components/CreateCard';
import Cards from './components/Cards';
import Flashcard from './components/flashcard';
import Pic from './components/Pic';
import NewDeck from './components/CreateDeck';


function App() {
  
  const [authUser, setAuthUser] = useState<User>(); // undefined as unknown as User
  const [token, setToken] = useState<string>();
  const [selection, setSelection] = useState<string>();

  return (
    <>
      <Navbar currentUser={authUser} setCurrentUser={setAuthUser} />
      <Routes>
        <Route path="/login" element={<Login currentUser={authUser} setCurrentUser={setAuthUser}/>}/>
        <Route path='/dashboard'  element={<Dashboard currentUser={authUser}/>}/>
        <Route path='/decks'  element={<DeckView currentSelection={selection} setCurrentSelection={setSelection}/>}/>
        <Route path='/picsetter'  element={<Pic currentUser={authUser} setCurrentUser={setAuthUser}/>}/>
        <Route path='/adminView'  element={<AdminView currentUser={authUser}/>}/>
        <Route path='/register'  element={<Register currentUser={authUser} setCurrentUser={setAuthUser}/>}/>
        <Route path='/createCard' element={<CreateCard currentUser={authUser}/>}/>
        <Route path='/createDeck' element={<NewDeck currentUser={authUser}/>}/>
        <Route path='/cards' element={<Cards/>}/>
        <Route path='/flashcards' element={<Flashcard currentSelection={selection} setCurrentSelection={setSelection}/>}/>
      </Routes>
    </>
  );
}

export default App;

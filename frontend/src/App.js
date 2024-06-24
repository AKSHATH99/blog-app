import logo from './logo.svg';
import './App.css';
// import Home from './pages/Home.js';
import Home from './components/Home.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import Createpost from './pages/Createpost.js';
import Postdetails from './pages/Postdetails.js';
import EditPost from './pages/Editpost.js'
import Profile from './pages/Profile.js'
import Mypost from './pages/Mypost.js'
import {Route , Routes } from 'react-router-dom'
import Navbar from './components/Navbar.js';
import UserContextProvider from "./context/UserContext.js"

function App() {
  return (
    <UserContextProvider>
    <Routes>
      <Route exact path = '/' element = {<Home/>}/>
      <Route exact path = '/login' element = {<Login/>}/>
      <Route exact path = '/register' element = {<Register/>}/>
      <Route exact path = '/write' element = {<Createpost/>}/>
      <Route exact path = '/Post/post/:id' element = {<Postdetails/>}/>
      <Route exact path = '/edit/:id' element = {<EditPost/>}/>
      <Route exact path = '/myblogs/:id' element = {<Mypost/>}/>
      <Route exact path = '/profile/:id' element = {<Profile/>}/>
    </Routes>
    </UserContextProvider>
  );
}

export default App;

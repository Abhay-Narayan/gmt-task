import "./App.css";
import {Routes, Route} from 'react-router-dom';
import Home from "./Home";
import Signup from "./Signup";
import Login from './Login'

export default function App() {

  return(  
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/signup' element={<Signup/>}/>
        <Route exact path='/login' element={<Login/>}/>
      </Routes>
    
  );
}
import Clock from "./components/Clock/Clock";
import Navbar from "./components/Navbar";
import './App.css'
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate=useNavigate();

  useEffect(()=>{
    let token= sessionStorage.getItem('Auth Token');
    //console.log(token);
    if(token){
      navigate('/')
    }
    else{
      navigate('/signup')
    }
  },[navigate])
  return (
    <div className="main flex-col items-center justify-center">
      <Navbar/>
      <Clock/>
    </div>
  )
}

export default Home
import { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
//import app from '../firebase'

const Navbar = () => {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);
  const auth = getAuth();
  const navigate= useNavigate();
  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  const handlelogout=async()=>{
    try {
       await signOut(auth)
       .then(()=>{
        sessionStorage.removeItem('Auth Token');
        navigate('/login')
       })
    } catch (error) {
      console.log(error)
    }
  }

  // Array containing navigation items
  const navItems = [
    { id: 1, text: 'Logout' },
  ];

  return (
    <div className='bg-slate-700 flex justify-between items-center h-18 max-w-[1240px] mx-auto px-4 text-white rounded-full mt-1 shadow-lg'>
      {/* Logo */}
      <h1 className='w-full text-3xl font-bold text-[#FE8C00]'>CLOCK SHARE</h1>

      {/* Desktop Navigation */}
      <ul className='hidden md:flex'>
        {navItems.map(item => (
          <li
            key={item.id}
            className='p-4 hover:bg-[#FE8C00] rounded-xl m-2 cursor-pointer duration-300 hover:text-black'
            onClick={handlelogout}
          >
            {item.text}
          </li>
        ))}
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className='block md:hidden'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
            : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
        }
      >
        {/* Mobile Logo */}
        <h1 className='w-full text-3xl font-bold text-[#FE8C00] m-4'>Clock</h1>

        {/* Mobile Navigation Items */}
        {navItems.map(item => (
          <li
            key={item.id}
            className='p-4 border-b rounded-xl hover:bg-[#FE8C00] duration-300 hover:text-black cursor-pointer border-gray-600'
            onClick={handlelogout}
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
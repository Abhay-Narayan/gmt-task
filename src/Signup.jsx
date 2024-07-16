import { useState } from "react"
import googl from '../public/gp.png'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from './firebase'


const Signup = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState(''); 
  const auth=getAuth(app);
  const navigate = useNavigate();
 //console.log(auth);
  const provider=new GoogleAuthProvider();
  const onsubmit=async(e)=>{
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
    .then((usercreds)=>{
      const user=usercreds.user;
      console.log(user);
      sessionStorage.setItem('Auth Token', usercreds._tokenResponse.refreshToken)
      navigate('/login')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
  });
  }

  const handlegoogle=async()=>{
    try {
      await signInWithPopup(auth , provider)
      .then((result)=>{
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        sessionStorage.setItem('Auth Token', token);
        navigate('/')
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex items-center justify-center h-[100vh] bg-slate-100 ">
      <div className="w-[80%]  border-slate-500 rounded-xl lg:w-[40%] lg:h-[70vh] bg-white shadow-lg p-2">
        <h1 className="font-bold text-3xl">Create your new account</h1>
        <p className="text-gray-400">Create an account to access the further pages...</p>
        <form className="w-[100%] flex flex-col mt-2 gap-1">
          <label className="font-medium">Email Address</label>
          <input required className="p-2 border border-gray-400 bg-gray-200 rounded-md" type="text" value={email} onChange={(e)=>setemail(e.target.value)} />
          <label className="mt-1">Password</label>
          <input required className="p-2 border border-gray-400 bg-gray-200 rounded-md" type="password" value={password} onChange={(e)=>setpassword(e.target.value)} />
          <button type="submit" onClick={onsubmit} className="p-2 mt-2 rounded-full bg-[#FE8C00]" >Sign Up</button>
          <hr className="mt-3"/>
        </form>
        <div className="flex flex-col items-center justify-center gap-1 mt-2">
          <p className="text-gray-400">Sign up with google</p>
          <button onClick={handlegoogle} className="w-12 h-12 border border-gray-400 rounded-full "><img className="w-8 h-8 mx-auto" src={googl} alt="" /></button>
          <p className="text-gray-400">Already have an account? <Link className= " text-[#FE8C00] font-semibold" to='/login'>Login</Link>  </p>
        </div>
      </div> 
    </div>
  )
}
export default Signup
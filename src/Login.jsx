import { useState } from "react"
import googl from '../public/gp.png'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


const Login = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('')
  const provider=new GoogleAuthProvider();
  const auth=getAuth();
  const navigate=useNavigate()
  const handlesignin=async(e)=>{
    e.preventDefault();
    try {
        await signInWithEmailAndPassword(auth,email,password)
        .then((userCredential)=>{
            navigate('/');
            sessionStorage.setItem('Auth Token', userCredential._tokenResponse.refreshToken)
        })
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
    }
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
      <div className="form border-slate-500 rounded-xl w-[40%] h-[70vh] bg-white shadow-lg p-2">
        <h1 className="font-bold text-3xl">Login to your account</h1>
        <p className="text-gray-400">Please Sign in to your account</p>
        <form className="w-[100%] flex flex-col mt-2 gap-1">
          <label className="font-medium">Email Address</label>
          <input required className="p-2 border border-gray-400 bg-gray-200 rounded-md" type="text" value={email} onChange={(e)=>setemail(e.target.value)} />
          <label className="mt-1">Password</label>
          <input className="p-2 border border-gray-400 bg-gray-200 rounded-md" required type="password" value={password} onChange={(e)=>setpassword(e.target.value)} />
          <button onClick={handlesignin} className="p-2 mt-2 rounded-full bg-[#FE8C00]" >Login</button>
          <hr className="mt-3"/>
        </form>
        <div className="flex flex-col items-center justify-center gap-1 mt-2">
          <p className="text-gray-400">Log in with google</p>
          <button onClick={handlegoogle} className="w-12 h-12 border border-gray-400 rounded-full "><img className="w-8 h-8 mx-auto" src={googl} alt="" /></button>
          <p className="text-gray-400">Don&apos;t have an account? <Link className= " text-[#FE8C00] font-semibold" to='/signup'>Register</Link>  </p>
        </div>
      </div> 
    </div>
  )
}

export default Login
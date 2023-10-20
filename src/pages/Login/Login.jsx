import React, { useState } from 'react'
import login from '../../assets/login.png'
import google from '../../assets/google.png'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLoginInfo } from '../../slices/userSlice';

const Login = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [email ,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[error, setError] = useState()

    const[emailerr, setEmailerr] = useState('');
    const[passworderr, setPassworderr] = useState('');

    const handleEmail = (e) =>{
       setEmail(e.target.value);
       setEmailerr('');
    }
    const handlePassword = (e) =>{
        setPassword(e.target.value);
        setPassworderr('');
    }


    const handleSignIn = () =>{
        if(!email){
            setEmailerr('Email is required');
        }else{
            if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)){
                setEmailerr('Email is Invalid');
            }
        }

        if(!password){
            setPassworderr('Password is required');
        }
        if(email && password && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email))){
            signInWithEmailAndPassword(auth, email, password)
            .then((user) => {
                toast.success('Login successful');
                console.log(user.user);
                dispatch(userLoginInfo(user.user))
                localStorage.setItem('userInfo',JSON.stringify(user.user))
                setTimeout(()=>{
                    navigate('/')
                },3000)
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode);
                if(errorCode.includes('auth/invalid-login-credentials')){
                    setError('plz give right email & password');
                  }
            });

        }
        
    }
  return (
    <div className='flex'>
        <div className='w-1/2 flex justify-end'>
            <div className='mr-[69px] mt-[225px]'>
            <ToastContainer 
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                />
                <h2 className='font-sans font-bold text-[34px] text-[#03014C] mb-[29px]'>Login to your account!</h2>
                <img src={google} alt="" />
                <p>{error}</p>
                <div className='relative mt-[60px]'>
                    <p className=' font-sans font-semibold text-[14px] text-[#11175D] tracking-[1px] mb-[10px]'>Email Address</p>
                    <input type="email" onChange={handleEmail} value={email} className=' w-96 border-b border-[#b8bacf]  outline-none' placeholder='Youraddres@email.com'/>
                    {
                        emailerr && 
                        <p className='bg-red-500 w-96 text-white py-2 px-1 mt-2'>{emailerr}</p>
                    }
                </div>
                <div className='relative mt-[60px]'>
                    <p className=' font-sans font-semibold text-[14px] text-[#11175D] tracking-[1px] mb-[10px]'>Password</p>
                    <input type="password"  onChange={handlePassword} value={password} className=' w-96 border-b border-[#b8bacf]  outline-none' placeholder='password'/>
                    {
                        passworderr && 
                        <p className='bg-red-500 w-96 text-white py-2 px-1 mt-2'>{passworderr}</p>
                    }
                </div>
                
                <div className=' w-96 text-center  mt-[51px] '>
                    <Link  onClick={handleSignIn} className='block bg-primary font-nunito font-semibold text-[20px] cursor-pointer text-white py-[20px] rounded-[86px]'>Login to Continue</Link>
                    <p className='font-sans text-[13px] text-[#03014C] text-center mt-[35px]'>Don’t have an account ? <span className='text-[#EA6C00] font-bold'><Link to='/registration'>Sign Up</Link></span></p>
                </div>
               
            </div>
        </div>
        <div className='w-1/2'>
            <img className='h-screen w-full object-cover' src={login} alt="" />
        </div>
    </div>
  )
}

export default Login
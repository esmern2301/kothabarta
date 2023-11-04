
import { useState } from 'react';
import registration from '../../assets/registration.png'
import {RiEyeCloseFill,RiEyeFill} from 'react-icons/ri';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { getDatabase, ref, set } from "firebase/database";


const Registration = () => {
    const auth = getAuth();
    const db = getDatabase();
    const navigate = useNavigate()
    const [email ,setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState('');
    const [success, setSuccess] = useState('');

    const[emailerr, setEmailerr] = useState('');
    const[fullNameerr, setFullNameerr] = useState('');
    const[passworderr, setPassworderr] = useState('');

    const handleEmail = (e) =>{
       setEmail(e.target.value);
       setEmailerr('');
    }
    const handleFullName = (e) =>{
        setFullName(e.target.value);
        setFullNameerr('');
    }
    const handlePassword = (e) =>{
        setPassword(e.target.value);
        setPassworderr('');
    }


    const handleSubmit = () =>{
        if(!email){
            setEmailerr('Email is required');
        }else{
            if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)){
                setEmailerr('Email is Invalid');
            }
        }
        if(!fullName){
            setFullNameerr('Fullname is required');
        }

        if(!password){
            setPassworderr('Password is required');
        }
        if(email && fullName && password && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email))){
            createUserWithEmailAndPassword(auth, email, password)
            .then((user) => {
                updateProfile(auth.currentUser, {
                    displayName: fullName, 
                    photoURL: "./src/assets/profile.png"
                  }).then(() => {
                    sendEmailVerification(auth.currentUser)
                    console.log(user, 'user');
                    toast.success('registraion done. please verify your email')
                    setEmail('');
                    setFullName('');
                    setPassword('');
                    setTimeout(()=>{
                        navigate('/login')
                    },3000)
                  }).then(()=>{
                    console.log(user, 'useeeeer');
                    set(ref(db, 'users/' + user.user.uid), {
                        username: user.user.displayName,
                        email: user.user.email
                    });
                  }) 
                }).catch((error) => {
                    const errorCode = error.code;
                    console.log(errorCode);
                    if(errorCode.includes('auth/email-already-in-use')){
                      setEmailerr('email is already in used');
                }
            });
        }
        
    }

  return (
    <div className='flex'>
        <div className='w-1/2 flex justify-end'>
            <div className='mr-[69px] mt-[225px]'>
                <h2 className='font-nunito font-bold text-[34px] text-[#11175D]'>Get started with easily register</h2>
                <p className='font-nunito text-[20px] text-[#000] mt-[13px]'>Free register and you can enjoy it</p>
                {/* <p className='font-nunito text-[20px] bg-green-500 text-white w-96'>{success}</p> */}
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
                <div className='relative mt-[60px]'>
                    <input type="email" onChange={handleEmail} value={email} className='py-[26px] px-[52px] w-96 border-2 border-[#b8bacf] rounded-lg outline-none'/>
                    <p className='absolute top-[-10px] left-[34px] font-nunito font-semibold text-[14px] text-[#11175D] tracking-[1px] bg-white px-[18px]'>Email Address</p>
                    {
                        emailerr && 
                        <p className='bg-red-500 w-96 text-white py-2 px-1 mt-2'>{emailerr}</p>
                    }
                </div>
                <div className='relative mt-[60px]'>
                    <input type="text" onChange={handleFullName} value={fullName} className='py-[26px] px-[52px] w-96 border-2 border-[#b8bacf] rounded-lg outline-none'/>
                    <p className='absolute top-[-10px] left-[34px] font-nunito font-semibold text-[14px] text-[#11175D] tracking-[1px] bg-white px-[18px]'>Full Name</p>
                    {
                        fullNameerr && 
                        <p className='bg-red-500 w-96 text-white py-2 px-1 mt-2'>{fullNameerr}</p>
                    }
                </div>
                <div className='relative mt-[60px]'>
                    <input type={showPassword ?'text':'password'} onChange={handlePassword} value={password} className='py-[26px] px-[52px] w-96 border-2 border-[#b8bacf] rounded-lg outline-none'/>
                    <p className='absolute top-[-10px] left-[34px] font-nunito font-semibold text-[14px] text-[#11175D] tracking-[1px] bg-white px-[18px]'>Password</p>
                   
                   {
                    showPassword ?

                    <RiEyeFill onClick={()=>setShowPassword(!showPassword)} className='absolute top-[25px] right-[114px]'/>
                 
                    :
                    <RiEyeCloseFill onClick={()=>setShowPassword(!showPassword)} className='absolute top-[25px] right-[114px]'/>
                   }
               
                    {
                        passworderr && 
                        <p className='bg-red-500 w-96 text-white py-2 px-1 mt-2'>{passworderr}</p>
                    }
                </div>
                <div className=' w-96 text-center  mt-[51px] '>
                    <button href="" onClick={handleSubmit} className=' bg-primary font-nunito font-semibold text-[20px] cursor-pointer text-white py-[20px] rounded-[86px] w-96'>Sign Up</button>
                    <p className='font-sans text-[13px] text-[#03014C] text-center mt-[35px]'>Already  have an account ? <span className='text-[#EA6C00] font-bold'><Link to='/login'>Sign In</Link></span></p>
                </div>
               
            </div>
        </div>
        <div className='w-1/2'>
            <img className='h-screen w-full object-cover' src={registration} alt="" />
        </div>
    </div>
  )
}

export default Registration
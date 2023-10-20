import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';

const Home = () => {
    const auth = getAuth();
    const data = useSelector((state)=>state.user.userInfo);
    const navigate = useNavigate();
    const [verify, setVerify] = useState(false)
    console.log(data);

    onAuthStateChanged(auth, (user) => {
        if (user.emailVerified) {
            setVerify(true)
        }
      });

      
    useEffect(()=>{
        if(!data){
            navigate('/login')
        }
    },[])

  return (
    <div>
        {
            verify ?
            <div className='flex px-[20px]'>
              <div className='w-[186px]'>
                <Sidebar/>
              </div>
              <div className='w-[427px]'>flgbflj</div>
              <div className='w-[344px]'>flgbflj</div>
              <div className='w-[344px]'>flgbflj</div>
            </div>
           
            :
            <>
            <div className='h-screen w-full bg-primary text-white'>
            <p className='font-nunito text-5xl'>please verify your email</p>
            <button><Link to='/login'>BACK TO LOGIN</Link></button>
            </div>
            </>
        }
    </div>
  )
}

export default Home
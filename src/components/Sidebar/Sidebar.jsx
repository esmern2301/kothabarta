import React from 'react'
import profile from '../../assets/profile.png'
import {AiOutlineHome,AiFillMessage, AiOutlineBell, AiOutlineSetting, AiOutlineLogout} from 'react-icons/ai'
import {BsCloudUploadFill} from 'react-icons/bs'
import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const auth = getAuth();
    const navigate = useNavigate()
    const handleSingout = () =>{
        signOut(auth).then(() => {
            console.log('signout done');
            setTimeout(()=>{
             navigate('/login')
            },2000)

          }).catch((error) => {
            console.log(error.code);
          });
          
    }
  return (
    <div className=' h-screen w-full rounded py-[20px] overflow-hidden'>
        <div className='bg-primary h-full rounded'>
           
            <div className='relative'>
               <img src={profile} alt="" className=' '/>
               <div className='after:absolute after:top-0 after:left-0 after:bg-overlay after:w-[100px] after:h-[100px] after:rounded-full after:z-[1] z-[-1] flex justify-center items-center'>
                     <BsCloudUploadFill/>
               </div>
            </div>
           
            
            
            <div className='mt-[78px] relative z-[1] py-[20px] after:absolute after:content-[""] after:top-0 after:left-[25px] after:rounded-l-lg after:bg-white after:h-full after:w-full after:z-[-1] before:absolute before:content-[""] before:top-0 before:right-0 before:bg-primary before:z-[1] before:h-full before:w-[8px] before:rounded-l-lg'>
              <AiOutlineHome className=' text-[46px] text-primary mx-auto'/>
            </div>
            <div className='mt-[57px]'>
                <AiFillMessage className='text-[46px] text-[#BAD1FF] mx-auto'/>
            </div>
            <div className='mt-[57px]'>
                <AiOutlineBell className='text-[46px] text-[#BAD1FF] mx-auto'/>
            </div>
            <div className='mt-[57px]'>
                <AiOutlineSetting className='text-[46px] text-[#BAD1FF] mx-auto'/>
            </div>
            <div className='mt-[100px]'>
                <AiOutlineLogout onClick={handleSingout} className='text-[46px] text-[#BAD1FF] mx-auto cursor-pointer'/>
            </div>
        </div>
    </div>
  )
}

export default Sidebar
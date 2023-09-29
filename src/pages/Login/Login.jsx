import React from 'react'
import login from '../../assets/login.png'
import google from '../../assets/google.png'

const Login = () => {
  return (
    <div className='flex'>
        <div className='w-1/2 flex justify-end'>
            <div className='mr-[69px] mt-[225px]'>
                <h2 className='font-sans font-bold text-[34px] text-[#03014C] mb-[29px]'>Login to your account!</h2>
                <img src={google} alt="" />
                <div className='relative mt-[60px]'>
                    <p className=' font-sans font-semibold text-[14px] text-[#11175D] tracking-[1px] mb-[10px]'>Email Address</p>
                    <input type="text" className=' w-96 border-b border-[#b8bacf]  outline-none' placeholder='Youraddres@email.com'/>
                </div>
                <div className='relative mt-[60px]'>
                    <p className=' font-sans font-semibold text-[14px] text-[#11175D] tracking-[1px] mb-[10px]'>Password</p>
                    <input type="text" className=' w-96 border-b border-[#b8bacf]  outline-none' placeholder='Youraddres@email.com'/>
                </div>
                
                <div className=' w-96 text-center  mt-[51px] '>
                    <a href="" className='block bg-primary font-nunito font-semibold text-[20px] cursor-pointer text-white py-[20px] rounded-[86px]'>Login to Continue</a>
                    <p className='font-sans text-[13px] text-[#03014C] text-center mt-[35px]'>Don’t have an account ? <span className='text-[#EA6C00] font-bold'>Sign up</span></p>
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
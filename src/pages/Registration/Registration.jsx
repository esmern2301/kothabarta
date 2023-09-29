import React from 'react'
import registration from '../../assets/registration.png'
const Registration = () => {
  return (
    <div className='flex'>
        <div className='w-1/2 flex justify-end'>
            <div className='mr-[69px] mt-[225px]'>
                <h2 className='font-nunito font-bold text-[34px] text-[#11175D]'>Get started with easily register</h2>
                <p className='font-nunito text-[20px] text-[#000] mt-[13px]'>Free register and you can enjoy it</p>
                <div className='relative mt-[60px]'>
                    <input type="text" className='py-[26px] px-[52px] w-96 border-2 border-[#b8bacf] rounded-lg outline-none'/>
                    <p className='absolute top-[-10px] left-[34px] font-nunito font-semibold text-[14px] text-[#11175D] tracking-[1px] bg-white px-[18px]'>Email Address</p>
                </div>
                <div className='relative mt-[60px]'>
                    <input type="text" className='py-[26px] px-[52px] w-96 border-2 border-[#b8bacf] rounded-lg outline-none'/>
                    <p className='absolute top-[-10px] left-[34px] font-nunito font-semibold text-[14px] text-[#11175D] tracking-[1px] bg-white px-[18px]'>Full Name</p>
                </div>
                <div className='relative mt-[60px]'>
                    <input type="text" className='py-[26px] px-[52px] w-96 border-2 border-[#b8bacf] rounded-lg outline-none'/>
                    <p className='absolute top-[-10px] left-[34px] font-nunito font-semibold text-[14px] text-[#11175D] tracking-[1px] bg-white px-[18px]'>Password</p>
                </div>
                <div className=' w-96 text-center  mt-[51px] '>
                    <a href="" className='block bg-primary font-nunito font-semibold text-[20px] cursor-pointer text-white py-[20px] rounded-[86px]'>Sign Up</a>
                    <p className='font-sans text-[13px] text-[#03014C] text-center mt-[35px]'>Already  have an account ? <span className='text-[#EA6C00] font-bold'>Sign In</span></p>
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
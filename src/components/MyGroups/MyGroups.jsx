import React from 'react'
import profile from '../../assets/profile.png'
import {BiDotsVerticalRounded} from 'react-icons/bi'

const MyGroups = () => {
  return (
    <div className=" bg-white border rounded-[20px] px-[23px] py-[20px] drop-shadow-lg mb-4 ">
        <div className='flex items-center justify-between'>
            <h3 className='text-[24px] font-pops font-semibold'>My Groups</h3>
            <BiDotsVerticalRounded className="text-2xl text-primary" />
        </div>
   
        <div className='mt-[20px] h-[400px] overflow-y-scroll'>
            <div className="flex items-center justify-between border-b-gray-300 border border-x-0 border-t-0 last:border-none py-[10px] mb-[10px]">
                <div>
                    <img src={profile} className="rounded-full" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-[20px] font-pops">Friends Reunion</h3>
                    <p className="text-gray-500 font-bold text-[14px] font-pops">Hi Guys, Wassup!</p>
                </div>
                <div>
                    <button className='bg-primary text-white px-[22px] font-pops rounded text-[20px]'>Join</button>
                </div>
            </div>
            <div className="flex items-center justify-between border-b-gray-300 border border-x-0 border-t-0 last:border-none py-[10px] mb-[10px]">
                <div>
                    <img src={profile} className="rounded-full" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-[20px] font-pops">Friends Reunion</h3>
                    <p className="text-gray-500 font-bold text-[14px] font-pops">Hi Guys, Wassup!</p>
                </div>
                <div>
                    <button className='bg-primary text-white px-[22px] font-pops rounded text-[20px]'>Join</button>
                </div>
            </div>
            <div className="flex items-center justify-between border-b-gray-300 border border-x-0 border-t-0 last:border-none py-[10px] mb-[10px]">
                <div>
                    <img src={profile} className="rounded-full" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-[20px] font-pops">Friends Reunion</h3>
                    <p className="text-gray-500 font-bold text-[14px] font-pops">Hi Guys, Wassup!</p>
                </div>
                <div>
                    <button className='bg-primary text-white px-[22px] font-pops rounded text-[20px]'>Join</button>
                </div>
            </div>
            <div className="flex items-center justify-between border-b-gray-300 border border-x-0 border-t-0 last:border-none py-[10px] mb-[10px]">
                <div>
                    <img src={profile} className="rounded-full" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-[20px] font-pops">Friends Reunion</h3>
                    <p className="text-gray-500 font-bold text-[14px] font-pops">Hi Guys, Wassup!</p>
                </div>
                <div>
                    <button className='bg-primary text-white px-[22px] font-pops rounded text-[20px]'>Join</button>
                </div>
            </div>
            <div className="flex items-center justify-between border-b-gray-300 border border-x-0 border-t-0 last:border-none py-[10px] mb-[10px]">
                <div>
                    <img src={profile} className="rounded-full" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-[20px] font-pops">Friends Reunion</h3>
                    <p className="text-gray-500 font-bold text-[14px] font-pops">Hi Guys, Wassup!</p>
                </div>
                <div>
                    <button className='bg-primary text-white px-[22px] font-pops rounded text-[20px]'>Join</button>
                </div>
            </div>
            <div className="flex items-center justify-between border-b-gray-300 border border-x-0 border-t-0 last:border-none py-[10px] mb-[10px]">
                <div>
                    <img src={profile} className="rounded-full" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-[20px] font-pops">Friends Reunion</h3>
                    <p className="text-gray-500 font-bold text-[14px] font-pops">Hi Guys, Wassup!</p>
                </div>
                <div>
                    <button className='bg-primary text-white px-[22px] font-pops rounded text-[20px]'>Join</button>
                </div>
            </div>
        </div>

</div>
    
  )
}

export default MyGroups
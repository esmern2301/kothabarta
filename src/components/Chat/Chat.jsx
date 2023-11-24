import React from 'react'
import profile from '../../assets/profile.png'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { TbTriangleFilled } from "react-icons/tb";
const Chat = () => {
    return (
        <div className='bg-white border rounded-[20px] px-[23px] py-[20px] drop-shadow-lg mb-4 h-screen overflow-y-scroll'>
            <div className='flex items-center justify-between border-b py-5'>
                <div className='flex items-center'>
                    <img src={profile} alt=""/>
                    <div className='ml-[20px]'>
                        <h3 className='text-xl font-bold text-[20px] font-pops'>Swathi</h3>
                        <p className='text-gray-500 font-bold text-[14px] font-pops'>Online</p>
                    </div>
                </div>
                <div>
                    <BiDotsVerticalRounded className="text-2xl text-primary" />
                </div>
            </div>

            <div className='pt-[50px] '>
               {/* Receiver msg start */}
               <div className='relative'>
                <p className='text-xl font-bold text-[20px] font-pops bg-[#F1F1F1] py-[20px] px-[50px] inline-block rounded-lg w-[500px]'>
                    Lorem ipsum dolor sit amet consectetur
                </p>
                <TbTriangleFilled className='absolute bottom-[-3px] left-[-10px] text-2xl text-[#F1F1F1]'/>
               </div>
               {/* Receiver msg end */}


               {/* SENDER msg start */}
               <div className='relative text-right mt-[30px]'>
                <p className='text-xl text-left font-bold text-[20px] font-pops bg-primary py-[20px] px-[50px] inline-block rounded-lg text-white w-[500px]'>Hi there
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum asperiores esse expedita libero debitis suscipit saepe eaque, pariatur fugiat illum cupiditate aperiam omnis dolorem temporibus natus magnam! Cupiditate, dicta doloribus. Rerum unde officia dolores ullam aut, illo eum ut ipsum hic minima fuga vero nam qui aperiam quos sapiente corporis nemo beatae atque! Cum nobis eos quas recusandae, distinctio aut blanditiis expedita error porro impedit exercitationem repudiandae, iste fugit animi numquam placeat id, odit possimus a vel esse odio. Magnam, soluta mollitia labore cupiditate cumque alias at expedita? Perferendis placeat facilis aspernatur natus laudantium fuga autem quos ipsa. Labore, iusto.</p>
                <TbTriangleFilled className='absolute bottom-[-3px] right-[-10px] text-2xl text-primary'/>
               </div>
               {/* SENDER msg end */}
            </div>
        </div>
    )
}

export default Chat
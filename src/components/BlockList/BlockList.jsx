import React, { useEffect, useState } from 'react'
import profile from '../../assets/profile.png'
import {BiDotsVerticalRounded} from 'react-icons/bi'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux';

const BlockList = () => {
    const data = useSelector(state => state.user.userInfo);
    const db = getDatabase();

    const [blockList, setBlockList] = useState([]);

    useEffect(() => {
        const blockRef = ref(db, 'block/');
        onValue(blockRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
               console.log(item.val(), 'block');
                if(item.val().blockbyid == data.uid){
                    arr.push({
                        id: item.key,
                        block: item.val().block,
                        blockid: item.val().blockid
                    })
                }else{
                    arr.push({
                        id: item.key,
                        blockby: item.val().blockby,
                        blockbyid: item.val().blockbyid
                    })
                }
             
            })
            setBlockList(arr)
        });
    }, [])
  return (
    <div className=" bg-white border rounded-[20px] px-[23px] py-[20px] drop-shadow-lg mb-4 ">
        <div className='flex items-center justify-between'>
            <h3 className='text-[24px] font-pops font-semibold'>BlockList</h3>
            <BiDotsVerticalRounded className="text-2xl text-primary" />
        </div>
   
        <div className='mt-[20px] h-[400px] overflow-y-scroll'>
            {
                blockList.map((item)=>(
                    <div className="flex items-center justify-between border-b-gray-300 border border-x-0 border-t-0 last:border-none py-[10px] mb-[10px]">
                        <div>
                            <img src={profile} className="rounded-full" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-[20px] font-pops">{item.block}</h3>
                            <h3 className="text-xl font-bold text-[20px] font-pops">{item.blockby}</h3>
                            

                            <p className="text-gray-500 font-bold text-[14px] font-pops">Hi Guys, Wassup!</p>
                        </div>
                        <div>
                            {
                             !item.blockbyid &&
                             <button className='bg-primary text-white px-[22px] font-pops rounded text-[20px]'>UnBlock</button>
                            }
                            
                        </div>
                    </div>
                ))
            }
            
        </div>

</div>
    
  )
}

export default BlockList
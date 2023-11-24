import React, { useEffect, useState } from 'react'
import profile from '../../assets/profile.png'
import {BiDotsVerticalRounded} from 'react-icons/bi'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux';

const FriendRequest = () => {
    const data = useSelector(state => state.user.userInfo);
    const db = getDatabase();

    const [friendRequestList, setFriendrequestList] = useState([])
    useEffect(() => {
        const friendrequestRef = ref(db, 'friendRequest/');
        onValue(friendrequestRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
               console.log(item.val(), 'frlist');
               if(item.val().receiverid == data.uid){
                   arr.push({...item.val(), id: item.key})

               }
            })
            setFriendrequestList(arr)
        });
    }, [])

    const handleAccept = (item) =>{
        console.log(item, 'item');
        set(push(ref(db, 'friend/')), {
           ...item
        }).then(()=>{
            remove(ref(db, 'friendRequest/' + item.id ))
        })
    }
  return (
    <div className=" bg-white border rounded-[20px] px-[23px] py-[20px] drop-shadow-lg mb-4 ">
        <div className='flex items-center justify-between'>
            <h3 className='text-[24px] font-pops font-semibold'>Friend Request</h3>
            <BiDotsVerticalRounded className="text-2xl text-primary" />
        </div>
   
        <div className='mt-[20px] h-[400px] overflow-y-scroll'>
            {
                friendRequestList.length == 0 ?
                <p>DATA NOT FOUND</p>
                :
                friendRequestList.map((item)=>(
                    <div className="flex items-center justify-between border-b-gray-300 border border-x-0 border-t-0 last:border-none py-[10px] mb-[10px]">
                    <div>
                        <img src={profile} className="rounded-full" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-[20px] font-pops">{item.sendername}</h3>
                        <p className="text-gray-500 font-bold text-[14px] font-pops">Hi Guys, Wassup!</p>
                    </div>
                    <div>
                        <button onClick={()=>handleAccept(item)} className='bg-primary text-white px-[22px] font-pops rounded text-[20px]'>Accept</button>
                    </div>
                </div>
                ))
            }
           
          
        </div>

</div>
    
  )
}

export default FriendRequest
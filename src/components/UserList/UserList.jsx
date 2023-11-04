import React, { useEffect, useState } from 'react'
import profile from '../../assets/profile.png'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from 'react-redux';

const UserList = () => {
    const db = getDatabase();
    const data = useSelector(state => state.user.userInfo);
    console.log(data);
    const [userData, SetUserData] = useState([]);

    useEffect(() => {
        const userRef = ref(db, 'users/');
        onValue(userRef, (snapshot) => {
            //   console.log(snapshot.val(), 'snapshot');
            let arr = []
            snapshot.forEach((item) => {
                console.log(item.key, 'keyu');
                // arr.push(item.val());
                if(data.uid != item.key){
                    arr.push(item.val());
                }
            })
            SetUserData(arr)
        });
    }, [])

    console.log(userData, 'userData');

    const handleFriendRequest = (item) =>{
        console.log(item, 'item');
    }

    return (
        <div className=" bg-white border rounded-[20px] px-[23px] py-[20px] drop-shadow-lg mb-4 ">
            <div className='flex items-center justify-between'>
                <h3 className='text-[24px] font-pops font-semibold'>User List</h3>
                <BiDotsVerticalRounded className="text-2xl text-primary" />
            </div>

            <div className='mt-[20px] h-[400px] overflow-y-scroll'>
                {
                    userData.map((item) => (
                        <div className="flex items-center justify-between border-b-gray-300 border border-x-0 border-t-0 last:border-none py-[10px] mb-[10px]">
                            <div>
                                <img src={profile} className="rounded-full" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[20px] font-pops">{item.username}</h3>
                                <p className="text-gray-500 font-bold text-[14px] font-pops">{item.email}</p>
                            </div>
                            <div>
                                <button onClick={()=>handleFriendRequest(item)} className='bg-primary text-white px-[22px] font-pops rounded text-[20px]'>+</button>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>

    )
}

export default UserList
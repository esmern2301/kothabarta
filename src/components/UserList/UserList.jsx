import React, { useEffect, useState } from 'react'
import profile from '../../assets/profile.png'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from 'react-redux';

const UserList = () => {
    const db = getDatabase();
    const data = useSelector(state => state.user.userInfo);
    console.log(data);
    const [userData, SetUserData] = useState([]);
    const [friendrequestList, setFriendrequestList] = useState([]);
    const [friendList, setFriendList] = useState([]);
 const [searchdata, setSearchdata] = useState([])
    useEffect(() => {
        const userRef = ref(db, 'users/');
        onValue(userRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                console.log(item.key, 'keyu');
                if (data.uid != item.key) {
                    arr.push({ ...item.val(), userid: item.key });
                }
            })
            SetUserData(arr)
        });
    }, [])

    console.log(userData, 'userData');

    const handleFriendRequest = (item) => {
        console.log(item, 'item');
        set(push(ref(db, 'friendRequest/')), {
            sendername: data.displayName,
            senderid: data.uid,
            receivername: item.username,
            receiverid: item.userid
        });
    }

    useEffect(() => {
        const friendReqRef = ref(db, 'friendRequest/');
        onValue(friendReqRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                arr.push(item.val().receiverid + item.val().senderid);
            })
            setFriendrequestList(arr)
        });
    }, [])
    console.log(friendrequestList);



    useEffect(() => {
        const friendRef = ref(db, 'friend/');
        onValue(friendRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                arr.push(item.val().receiverid + item.val().senderid);

            })
            setFriendList(arr)
        });
    }, [])

    const handleSearch = (e) => {
        let arr = []
        if(e.target.value.length == 0){
            setSearchdata([])
        }else{
            userData.filter((item)=>{
                if(item.username.toLowerCase().includes(e.target.value.toLowerCase())){
                    arr.push(item);
                    setSearchdata(arr)
                }
            })
        }
       
    }
    console.log(searchdata);

    return (
        <div className=" bg-white border rounded-[20px] px-[23px] py-[20px] drop-shadow-lg mb-4 ">
            <div className='flex items-center justify-between'>
                <h3 className='text-[24px] font-pops font-semibold'>User List</h3>
                <BiDotsVerticalRounded className="text-2xl text-primary" />
            </div>
            <div>
                <input onChange={handleSearch} type="text" className='border border-red-600 outline-none p-3 rounded-lg' />
            </div>

            <div className='mt-[20px] h-[400px] overflow-y-scroll'>
                {
                    searchdata.length > 0 ?
                    searchdata.map((item) => (
                        <div className="flex items-center justify-between border-b-gray-300 border border-x-0 border-t-0 last:border-none py-[10px] mb-[10px]">
                            <div>
                                <img src={profile} className="rounded-full" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[20px] font-pops">{item.username}</h3>
                                <p className="text-gray-500 font-bold text-[14px] font-pops">{item.email}</p>
                            </div>
                            <div>
                                {
                                    friendList.includes(item.userid + data.uid) ||
                                        friendList.includes(data.uid + item.userid)
                                        ?
                                        <button className='bg-primary text-white px-[22px] font-pops rounded text-[20px]'>friend</button>
                                        :
                                        <>
                                            {
                                                friendrequestList.includes(item.userid + data.uid) ||
                                                    friendrequestList.includes(data.uid + item.userid)
                                                    ?
                                                    <button className='bg-primary text-white px-[22px] font-pops rounded text-[20px]'>pending</button>
                                                    :
                                                    <button onClick={() => handleFriendRequest(item)} className='bg-primary text-white px-[22px] font-pops rounded text-[20px]'>+</button>
                                            }
                                        </>
                                }



                            </div>
                        </div>
                    ))
                    :
                    userData.map((item) => (
                        <div className="flex items-center justify-between border-b-gray-300 border border-x-0 border-t-0 last:border-none py-[10px] mb-[10px]">
                            <div>
                                <img src={item.img} className="rounded-full" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[20px] font-pops">{item.username}</h3>
                                <p className="text-gray-500 font-bold text-[14px] font-pops">{item.email}</p>
                            </div>
                            <div>
                                {
                                    friendList.includes(item.userid + data.uid) ||
                                        friendList.includes(data.uid + item.userid)
                                        ?
                                        <button className='bg-primary text-white px-[22px] font-pops rounded text-[20px]'>friend</button>
                                        :
                                        <>
                                            {
                                                friendrequestList.includes(item.userid + data.uid) ||
                                                    friendrequestList.includes(data.uid + item.userid)
                                                    ?
                                                    <button className='bg-primary text-white px-[22px] font-pops rounded text-[20px]'>pending</button>
                                                    :
                                                    <button onClick={() => handleFriendRequest(item)} className='bg-primary text-white px-[22px] font-pops rounded text-[20px]'>+</button>
                                            }
                                        </>
                                }



                            </div>
                        </div>
                    ))
                }
            </div>

        </div>

    )
}

export default UserList
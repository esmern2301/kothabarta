import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import { userLoginInfo } from '../../slices/userSlice';
import GroupList from '../../components/GroupList/GroupList';
import FriendList from '../../components/FriendRequest/FriendRequest';
import FriendRequest from '../../components/FriendRequest/FriendRequest';
import Friends from '../../components/Friends/Friends';
import UserList from '../../components/UserList/UserList';
import MyGroups from '../../components/MyGroups/MyGroups';
import BlockList from '../../components/BlockList/BlockList';

const Home = () => {
    const auth = getAuth();
    const data = useSelector((state)=>state.user.userInfo);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [verify, setVerify] = useState(false)
    console.log(data);

    onAuthStateChanged(auth, (user) => {
        if (user.emailVerified) {
            setVerify(true)
            dispatch(userLoginInfo(user));
            localStorage.setItem('userInfo', JSON.stringify((user)))
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
                <Sidebar active='home'/>
              </div>
              <div className='w-[500px] p-[20px]'>
                <GroupList/>
                <FriendRequest/>
              </div>
              <div className='w-[500px] p-[20px]'>
                <Friends/>
                <MyGroups/>
              </div>
              <div className='w-[500px] p-[20px]'>
                <UserList/>
                <BlockList/>
              </div>
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
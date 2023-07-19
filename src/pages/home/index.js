import { getAuth, onAuthStateChanged } from "firebase/auth"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FriendRequest from '../../components/homeComp/FriendRequest/FriendRequest'
import GroupRequest from '../../components/homeComp/GroupRequest/GroupRequest'
import Search from '../../components/homeComp/Search'
import Sidebar from '../../components/homeComp/Sidebar'
import BlockUsers from '../../components/homeComp/blockUsers/BlockUsers'
import Friend from '../../components/homeComp/friend/Friend'
import MyGroup from '../../components/homeComp/myGroup/MyGroup'
import UserLists from '../../components/homeComp/userlist/UserList'
import { userLogindata } from "../../slices/userSlice"

const Home = () => {
  const auth = getAuth();
  let dispatch = useDispatch()
  let navigate = useNavigate()
  let data = useSelector((state)=>state.reducer.userInfo)
  
  let [emailVerifie, setEmailVerifie] = useState(false)

  onAuthStateChanged(auth, (user)=>{
    
    if(user.emailVerified){
      setEmailVerifie(true)
      dispatch(userLogindata(user))
      localStorage.setItem("userEasychat",JSON.stringify(user))
    }
  })

  useEffect(()=>{
    if(!data){
      navigate("/login")
    }
  },[])
  return (
    <div className='flex gap-11'>
      {emailVerifie ? 
       <>
        <div className="w-[186px]">
        <Sidebar active="home"  />
        </div>
        <div className="w-[527px]">
          <Search />
          <GroupRequest />
          <FriendRequest />
        </div>
        <div className="w-[527px]">
          <Friend />
          <MyGroup />
        </div>
        <div className="w-[527px]">
          <UserLists />
          <BlockUsers />
        </div>
       </>
       :
       <h1 className='bg-primary font-lg'>please verifie email !</h1>
      }
    
    </div>
  )
}

export default Home
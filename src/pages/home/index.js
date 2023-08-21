import { getAuth, onAuthStateChanged } from "firebase/auth"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import FriendRequest from '../../components/homeComp/FriendRequest/FriendRequest'
import GroupRequest from '../../components/homeComp/GroupRequest/GroupRequest'
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
  console.log(data)
  
  let [emailVerifie, setEmailVerifie] = useState(false)


  useEffect(()=>{
    if(!data){
      navigate("/login")
    }
  },[])

  onAuthStateChanged(auth, (user)=>{
    if(user.emailVerified){
      setEmailVerifie(true)
      dispatch(userLogindata(user))
      localStorage.setItem("userEasychat",JSON.stringify(user))
    }
  })

  
  return (
    <div className='flex gap-11'>
      {emailVerifie ? 
       <>
        <div className="w-[186px]">
        <Sidebar active="home"  />
        </div>
        <div className="w-[527px]">
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
       <div className="bg-primary w-full h-screen flex justify-center items-center flex-col">
          <h1 className='bg-primary text-2xl text-white underline'>please verifie email !</h1>
          <Link className="bg-[#B46BF0] mt-8 px-5 py-2 rounded-lg font-bold" to="/login">Login</Link>
       </div>
       
      }
    
    </div>
  )
}

export default Home
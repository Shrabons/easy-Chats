import React from 'react'
import Chats from '../../components/chats/Chats'
import Search from '../../components/homeComp/Search'
import Sidebar from '../../components/homeComp/Sidebar'
import Friend from '../../components/homeComp/friend/Friend'
import MessageGroup from '../../components/messageGroup/MessageGroup'
const Messages = () => {
  return (
    <>
       
    <div className='flex gap-11'>
        <div className="w-[186px]">
        <Sidebar active="msg"  />
        </div>
        <div className="w-[527px]">
          <Search />
          <MessageGroup />
          <Friend />
        </div>
        <div className="w-[900px]">
          <Chats />
        </div>
        
    </div>
    </>

  )
}

export default Messages
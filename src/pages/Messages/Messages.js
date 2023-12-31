import React from 'react'
import Chats from '../../components/chats/Chats'
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
          <Friend />
          <MessageGroup />
        </div>
        <div className="w-[900px]">
          <Chats />
        </div>
        
    </div>
    </>

  )
}

export default Messages
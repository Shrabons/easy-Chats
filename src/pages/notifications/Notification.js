import React from 'react'
import Search from '../../components/homeComp/Search'
import Sidebar from '../../components/homeComp/Sidebar'
import Notifc from '../../components/notification/Notifc'

const Notification = () => {
  return (
    <div className='flex gap-11'>
        <div className="w-[186px]">
            <Sidebar active="notification"  />
        </div>
        <div className="w-[70%]">
            <Search />
            <Notifc />
        </div>
        
        
    </div>
  )
}

export default Notification
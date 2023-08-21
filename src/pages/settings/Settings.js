import React from 'react'
import Sidebar from '../../components/homeComp/Sidebar'
import Account from '../../components/settings/Account'
import Profile from '../../components/settings/Profile'

const Settings = () => {
  return (
    <>
    <div className='flex gap-11'>
        <div className="w-[186px]">
        <Sidebar active="settings"  />
        </div>
        <div className="w-[25%]">
          <Profile />
        </div>
        <div className="w-[25%]">
          <Account />
        </div>
        
    </div>
    </>
  )
}

export default Settings
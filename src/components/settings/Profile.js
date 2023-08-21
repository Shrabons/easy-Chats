import { getAuth } from "firebase/auth"
import React from 'react'
import { BiHelpCircle } from "react-icons/bi"
import { BsPencilSquare } from "react-icons/bs"
import { MdAddPhotoAlternate } from "react-icons/md"
import { RiMessage2Fill } from "react-icons/ri"


const Profile = () => {
    const auth = getAuth();
  return (
    <div className='h-[650px] shadow-lg mt-10 p-8 rounded-xl'>
        <h2 className='text-[30px] text-nunito capitalize font-bold mb-8'>Profile Settings</h2>
        <div  className="flex gap-x-6 items-center border-b-2 pb-3 mb-3">
            <div className="w-1/5">
                <img className="w-[100px] h-[100px] rounded-full" src={auth.currentUser.photoURL} alt="group1" />
            </div>
            <div className="w-2/5">
                <h3 className='font-nunito font-bold text-2xl capitalize'>
                {auth.currentUser.displayName}
                </h3>
                <p className='font-nunito font-normal text-sm text-[#4D4D4D]'>Stay home stay safe</p>
            </div>
        </div>
        <div className="setting mt-8">
            <ul className='ml-8'>
                <li className=' py-5 flex items-center cursor-pointer hover:text-[#B46BF0] hover:underline '>
                    <div className='w-10'><BsPencilSquare className='text-[25px]' /></div>
                    <p className='font-nunito ml-1 font-semibold'>Edit Profile Name.</p>
                </li>
                <li className=' py-5 flex items-center cursor-pointer hover:text-[#B46BF0] hover:underline'>
                    <div className='w-10'><RiMessage2Fill className='text-[25px]' /></div>
                    <p className='font-nunito ml-1 font-semibold'>Edit Profile Status Info.</p>
                </li>
                <li className=' py-5 flex items-center cursor-pointer hover:text-[#B46BF0] hover:underline'>
                    <div className='w-10'><MdAddPhotoAlternate className='text-[30px]' /></div>
                    <p className='font-nunito ml-1 font-semibold'>Edit Profile Photo.</p>
                </li>
                <li className=' py-5 flex items-center cursor-pointer hover:text-[#B46BF0] hover:underline'>
                    <div className='w-10'><BiHelpCircle className='text-[25px]' /></div>
                    <p className='font-nunito ml-1 font-semibold'>Help</p>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Profile
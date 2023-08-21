import React from 'react'
import { FaKey } from 'react-icons/fa'
import { RiDeleteBinFill } from 'react-icons/ri'
import { VscColorMode } from 'react-icons/vsc'


const Account = () => {
  return (
    <div className='h-[650px] shadow-lg mt-10 p-8 rounded-xl'>
        <h2 className='text-[30px] text-nunito capitalize font-bold mb-8'>Account Settings</h2>
        <div className="setting mt-8">
            <ul className='ml-8'>
                <li className=' py-5 flex items-center cursor-pointer hover:text-[#B46BF0] hover:underline '>
                    <div className='w-10'><FaKey className='text-[25px]' /></div>
                    <p className='font-nunito ml-1 font-semibold'>Account</p>
                </li>
                <li className=' py-5 flex items-center cursor-pointer hover:text-[#B46BF0] hover:underline'>
                    <div className='w-10'><VscColorMode className='text-[25px]' /></div>
                    <p className='font-nunito ml-1 font-semibold'>Theme.</p>
                </li>
                <li className=' py-5 flex items-center cursor-pointer hover:text-[#B46BF0] hover:underline'>
                    <div className='w-10'><RiDeleteBinFill className='text-[30px]' /></div>
                    <p className='font-nunito ml-1 font-semibold'>Delete Account.</p>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Account
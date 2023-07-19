import React from 'react'
import { BsSearch, BsThreeDotsVertical } from 'react-icons/bs'

const Search = () => {
  return (
    <div className=' mt-5 relative'>
        <input className='w-full py-[17px] pl-20 rounded-2xl shadow-xl' type="text" placeholder='Search' />
        <BsSearch className='text-xl absolute top-[19px] left-[25px] text-black' />
        <BsThreeDotsVertical className='text-xl absolute top-[19px] right-[17px] text-primary' />
        
    </div>
  )
}

export default Search
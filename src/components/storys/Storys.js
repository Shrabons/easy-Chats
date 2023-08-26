import React from 'react'
import { BsFillPlusCircleFill } from 'react-icons/bs'

import { useSelector } from 'react-redux'

const Storys = () => {

    let data = useSelector((state)=>state.reducer.userInfo)
    console.log(data.photoURL)
  return (
    
    <div className='mt-4 flex  gap-3 overflow-y-scroll h-[160px]   '>
        <div className='crate-story h-48 bg-slate-700 w-1/4 rounded-lg overflow-hidden relative'>
            <div>
                <img className='w-full h-48' src={data.photoURL} alt="" />
            </div>
            <div className='absolute bottom-0 left-0 bg-slate-800 w-full text-center py-3'>
                <BsFillPlusCircleFill className='text-primary text-3xl absolute bottom-[35px] left-1/2 -translate-x-1/2  bg-white rounded-full' />
                <span className='text-white'>Create Story</span>
            </div>
        </div>
        <div className='crate-story h-48 bg-slate-700 w-1/4 rounded-lg overflow-hidden relative'>
            <div className=''>
                <img className='w-full h-48' src="images/bg-right.png"alt="" />
                <div className='absolute top-0 left-0 bg-black w-full h-full opacity-50'></div>
            </div>
            <div className='w-8 h-8 bg-slate-500 absolute top-2 right-2 rounded-full overflow-hidden border-[3px] border-primary '>
                <img className='w-full' src={data.photoURL} alt="" />
            </div>
            <div className='absolute bottom-0 left-0 w-full text-center py-3'>
                <span className='text-white font-nunito font-medium '>{data.displayName}</span>
            </div>
        </div>
        <div className='crate-story h-48 bg-slate-700 w-1/4 rounded-lg overflow-hidden relative'>
            <div className=''>
                <img className='w-full h-48' src="images/bg-right.png"alt="" />
                <div className='absolute top-0 left-0 bg-black w-full h-full opacity-50'></div>
            </div>
            <div className='w-8 h-8 bg-slate-500 absolute top-2 right-2 rounded-full overflow-hidden border-[3px] border-primary '>
                <img className='w-full' src={data.photoURL} alt="" />
            </div>
            <div className='absolute bottom-0 left-0 w-full text-center py-3'>
                <span className='text-white font-nunito font-medium '>{data.displayName}</span>
            </div>
        </div>
        <div className='crate-story h-48 bg-slate-700 w-1/4 rounded-lg overflow-hidden relative'>
            <div className=''>
                <img className='w-full h-48' src="images/bg-right.png"alt="" />
                <div className='absolute top-0 left-0 bg-black w-full h-full opacity-50'></div>
            </div>
            <div className='w-8 h-8 bg-slate-500 absolute top-2 right-2 rounded-full overflow-hidden border-[3px] border-primary '>
                <img className='w-full' src={data.photoURL} alt="" />
            </div>
            <div className='absolute bottom-0 left-0 w-full text-center py-3'>
                <span className='text-white font-nunito font-medium '>{data.displayName}</span>
            </div>
        </div>
        <div className='crate-story h-48 bg-slate-700 w-1/4 rounded-lg overflow-hidden relative'>
            <div className=''>
                <img className='w-full h-48' src="images/bg-right.png"alt="" />
                <div className='absolute top-0 left-0 bg-black w-full h-full opacity-50'></div>
            </div>
            <div className='w-8 h-8 bg-slate-500 absolute top-2 right-2 rounded-full overflow-hidden border-[3px] border-primary '>
                <img className='w-full' src={data.photoURL} alt="" />
            </div>
            <div className='absolute bottom-0 left-0 w-full text-center py-3'>
                <span className='text-white font-nunito font-medium '>{data.displayName}</span>
            </div>
        </div>
        
       
    </div>
 
    
  )
}

export default Storys
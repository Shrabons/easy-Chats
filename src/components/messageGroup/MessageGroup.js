
import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";


const MessageGroup = () => {
    const db = getDatabase();

    let [mygroup, setMygroup] = useState([])
    let data = useSelector((state)=> state.getInitialState.userInfo)
    
   

    useEffect(()=>{
        const groupRef = ref(db, 'groups/' );
        onValue(groupRef, (snapshot) => {
        let arr = []
          snapshot.forEach((item)=>{
          
                arr.push({...item.val(), key: item.key})
            
          })
          setMygroup(arr)
        });
    },[]) 



  return (
    <div className='w-full bg-white rounded-lg shadow-lg py-3 px-4 mt-11 h-[347px] overflow-y-scroll'>
        <div className='relative'>
        <h3 className='font-nunito font-semibold text-lg mb-4'>Groups Request</h3>
       <div className=''>
        {
            mygroup.map((item, index)=>(
                <div key={index} className="flex gap-x-6 items-center border-b-2 pb-3 mb-3">
                    <div className="w-1/6">
                        <img src="images/group1.png" alt="group1" />
                    </div>
                    <div className="w-4/6">
                        <h3 className='font-nunito font-semibold text-lg capitalize'>{item.groupname} </h3>
                        <p className='font-nunito font-normal text-sm text-[#4D4D4D]'>{item.grouptagline}</p>
                    </div>
                    <div className="w-1/6">
                        <button  className='bg-primary py-2 px-5 text-lg font-semibold text-white rounded-lg '>Msg</button>
                    </div>
                </div>
            )) 
        }    
       </div>
    </div>
    </div>
  )
}

export default MessageGroup
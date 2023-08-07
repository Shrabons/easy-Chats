import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import React, { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useSelector } from "react-redux";



const FriendRequest = () => {
    const db = getDatabase();
    let data = useSelector((state)=> state.getInitialState.userInfo)

    let [firendrequest, setFirentrequest] = useState([])
    useEffect(()=>{
        const starCountRef = ref(db, 'firendrequest/');
        onValue(starCountRef, (snapshot) => {
        let firendRequestArr = []
          snapshot.forEach((item)=>{
            if(item.val().reciverid == data.uid){
                firendRequestArr.push({...item.val(), id: item.key})
            }
          });
          setFirentrequest(firendRequestArr)
        });
    },[])

    let handleFirendAccept = (item) => {
        set(push(ref(db, 'firends/' )), {
            ...item
          }).then(()=>{
            remove(ref(db, 'firendrequest/' + item.id))
          });
        
    }
  return (
    <div className='w-full bg-white rounded-lg shadow-lg py-3 px-4 mt-11 h-[347px] overflow-y-scroll'>
        <div className='relative'>
            <h3 className='font-nunito font-semibold text-lg mb-4'>Friend Request</h3>
            <BsThreeDotsVertical className='absolute text-lg top-[6px] right-[0px]' />

            <div className=''>
              {firendrequest.length == 0 ?
                <p className=' mt-2 bg-red-400 text-white px-5 py-4 rounded'>NO  Request Available</p>
              :
              firendrequest.map((item, index)=>(
                <div key={index} className="flex gap-x-2 items-center border-b-2 pb-3 mb-3">
                    <div className="w-1/5">
                        <img src="images/group1.png" alt="group1" />
                    </div>
                    <div className="w-3/5">
                        <h3 className='font-nunito font-semibold text-lg'>{item.sendername} </h3>
                        <p className='font-nunito font-normal text-sm text-[#4D4D4D]'>{item.email}</p>
                    </div>
                    <div className="w-1/5">
                        <button onClick={()=>handleFirendAccept(item)}  className='bg-primary py-2 px-5 text-lg font-semibold text-white rounded-lg '> Accept</button>
                    </div>
                </div>
            ))
              }
            
               
            </div>
        </div>
    </div>
  )
}

export default FriendRequest
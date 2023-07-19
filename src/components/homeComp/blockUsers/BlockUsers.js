
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";

import React, { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useSelector } from "react-redux";

const BlockUsers = () => {

const db = getDatabase();
let [blockuser, setBlockuser] = useState([])

let data = useSelector((state)=> state.getInitialState.userInfo)
let amiusedata = useSelector((state)=> state.reducer.ami)
console.log(amiusedata)



useEffect(()=>{
    const starCountRef = ref(db, 'blocks/' );
    onValue(starCountRef, (snapshot) => {
        let blockArr = []
        snapshot.forEach((item)=>{
            console.log(item.val().blockbyname)
            if(item.val().blockbyid == data.uid){
                blockArr.push({
                    id:item.key,
                    block: item.val().block,
                    blockid: item.val().blockid
                })
            }else{
                blockArr.push({
                    id:item.key,
                    blockbyid: item.val().blockbyid,
                    blockbyname: item.val().blockbyname
                })
            }
        })
        setBlockuser(blockArr)
    });
},[])


let handleUnBlockFrient = (item) =>{
    set(push(ref(db, 'firends/' )), {
        sendername: item.block,
        senderid: item.blockid, 
        recivername: data.displayName,
        reciverid : data.uid,
      }).then(()=>{
        remove(ref(db, 'blocks/' + item.id))
      });
}

  return (
    <div className='w-full bg-white rounded-lg shadow-lg py-3 px-4 mt-11 h-[347px] overflow-y-scroll'>
        <div className='relative'>
            <h3 className='font-nunito font-semibold text-lg mb-4'>Blocked Users</h3>
            <BsThreeDotsVertical className='absolute text-lg top-[6px] right-[0px]' />
            <div className=''>
                {blockuser.map((item, index)=>(
                    <div key={index} className="flex gap-x-6 items-center border-b-2 pb-3 mb-3">
                        <div className="w-1/6">
                            <img src="images/group1.png" alt="group1" />
                        </div>
                        <div className="w-3/6">
                            <h3 className='font-nunito font-semibold text-lg'>{item.block} </h3>
                            <h3 className='font-nunito font-semibold text-lg'>{item.blockbyname} </h3>
                            <p className='font-nunito font-normal text-sm text-[#4D4D4D]'>Hi Guys, Wassup!</p>
                        </div>
                        <div className="w-2/6">
                            {!item.blockbyid &&
                            <button onClick={()=>handleUnBlockFrient(item)} className='bg-primary py-2 px-5 text-lg font-semibold text-white rounded-lg ml-11'>unBlock</button>
                            }
                        </div>
                    </div>
                ))}
                
                
            </div>
        </div>
    </div>
  )
}

export default BlockUsers
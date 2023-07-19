import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import React, { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useDispatch, useSelector } from "react-redux";
import { activeChat } from "../../../slices/userSlice";


const Friend = () => {

const db = getDatabase();
let dispatch = useDispatch()
let [firend, setFirend] = useState([])
// let [useroption, setUserOption] = useState(false)

let data = useSelector((state)=> state.getInitialState.userInfo)

// let handleUserOption = () =>{
   
//     if(useroption == false){
//         setUserOption(true)
//     }else {
//         setUserOption(false)
//     }
// }

useEffect(()=>{
    const firendRef = ref(db, 'firends/' );
    onValue(firendRef, (snapshot) => {
    let arr = []
      snapshot.forEach((item)=>{
          if(data.uid == item.val().reciverid || data.uid == item.val().senderid){
            arr.push({...item.val(), key: item.key})
        }
      })
      setFirend(arr)
    });
},[])

let handleUnFriend = (item) =>{
    console.log(item.key)
    remove(ref(db, 'firends/' + item.key))
    
}

let handleBlock = (item) =>{
    console.log(item)
    if(data.uid == item.senderid){
        set(push(ref(db, 'blocks/')), {
            blockid: item.reciverid,
            block: item.recivername,
            blockbyid: item.senderid,
            blockbyname: item.sendername
          }).then(()=>{
            remove(ref(db, 'firends/' + item.key))
          });
        console.log('shrabon')
        
    }else{
        set(push(ref(db, 'blocks/')), {
            blockid: item.senderid ,
            block: item.sendername ,
            blockbyid: item.reciverid,
            blockbyname: item.recivername
          }).then(()=>{
            remove(ref(db, 'firends/' + item.key))
          });
          console.log('bikash')
    }
}

  let handleActiveSignle = (item) => {
    if(item.reciverid == data.uid){
      dispatch(activeChat({status:"single", id: item.senderid, name: item.sendername}));
      localStorage.setItem("activeChatname",JSON.stringify({status:"single",id: item.senderid, name: item.sendername}))
    }else{
      dispatch(activeChat({status:"single", id: item.reciverid, name: item.recivername}));
      // localStorage.setItem("activeChatname",JSON.stringify({status:"single", id: item.reciverid, name: item.recivername}))
      
    }
  }

  return (
    <div className='w-full bg-white rounded-lg shadow-lg py-3 px-4 mt-11 h-[347px] overflow-y-scroll'>
        <div className='relative'>
            <h3 className='font-nunito font-semibold text-lg mb-4'>Friend </h3>
            <BsThreeDotsVertical className='absolute text-lg top-[6px] right-[0px]' />
            <input  className='w-full py-[12px] pl-5 mb-6 rounded-2xl shadow-xl' type="text" placeholder='Search' />
            <div className=''>
                {firend.map((item, index)=>(

                <div onClick={()=> handleActiveSignle(item)} key={index} className="flex gap-x-6 items-center border-b-2 pb-3 mb-3">
                    <div className="w-1/5">
                        <img src="images/group1.png" alt="group1" />
                    </div>
                    <div className="w-2/5">
                        <h3 className='font-nunito font-semibold text-lg'>
                        {data.uid == item.senderid ? item.recivername: item.sendername}
                        </h3>
                        <p className='font-nunito font-normal text-sm text-[#4D4D4D]'>Hi Guys, Wassup!</p>
                    </div>
                    <div className="w-2/5 text-end relative">
                        <button onClick={()=>handleBlock(item)} className='bg-primary py-2 px-5 text-lg font-semibold text-white rounded-lg '>block</button>
                        {/* <button onClick={handleUserOption} className='text-primary py-2  text-4xl font-semibold  rounded-md '><BiDotsVertical /></button> */}
                        
                    </div>
                </div>
                ))}
                {/* {useroption ?
                <div className="two-btn bg-slate-400 rounded-lg absolute top-[50px] right-0 ">
                    <button  className=' py-2 px-5 text-lg font-semibold text-white w-full text-left hover:bg-primary block'>unFriend</button>
                    <button  className=' py-2 px-5 text-lg font-semibold text-white w-full text-left hover:bg-primary block'>block</button>
                </div>
                :
                null
                } */}
            </div>
        </div>
    </div>
  )
}

export default Friend

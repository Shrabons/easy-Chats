import { getDatabase, onValue, push, ref, set } from "firebase/database";
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";


const GroupRequest = () => {
    const db = getDatabase();
    let [show, setShow] = useState(false)
    let [groupname, setGroupname] = useState("")
    let [groupnameErr, setGroupnameErr] = useState("")
    let [groupTagline, setGroupTagline] = useState("")
    let [groupTaglineErr, setGroupTaglineErr] = useState("")
    let [mygroup, setMygroup] = useState([])
    let data = useSelector((state)=> state.getInitialState.userInfo)
    
    let handleGroupCreateShow = () =>{
        setShow(!show)
    }
    let hangleChangeGroupname = (e) => {
        setGroupname(e.target.value)
        setGroupnameErr("")
    }
    let hangleChangeGroupTagline = (e) => {
        setGroupTagline(e.target.value)
        setGroupTaglineErr("")
    }
    let handleGroupCreate = () =>{
        if(!groupname){
            setGroupnameErr("Plaese Group name !")
        }
        if(!groupTagline){
            setGroupTaglineErr("Plaese Group Tagline !")
        }

        set(push(ref(db, 'groups/' )), {
            groupname: groupname,
            grouptagline: groupTagline,
            adminid: data.uid,
            adminname: data.displayName
          }).then(()=>{
            setGroupname("")
            setGroupTagline("")
            setShow(!show)
          })    
    }

    useEffect(()=>{
        const groupRef = ref(db, 'groups/' );
        onValue(groupRef, (snapshot) => {
        let arr = []
          snapshot.forEach((item)=>{
            if(data.uid != item.val().adminid){
                arr.push({...item.val(), key: item.key})
            }
          })
          setMygroup(arr)
        });
    },[]) 

    let handleGroupJoin =(item)=>{
        set(push(ref(db, 'groupjoinrequest/' )), {
            groupid:item.key,
            groupname: item.groupname,
            grouptagline: item.grouptagline,
            adminid: item.adminid,
            adminname: item.adminname,
            userid: data.uid,
            username: data.displayName
          })
        console.log(item)
    }

  return (
    <div className='w-full bg-white rounded-lg shadow-lg py-3 px-4 mt-11 h-[347px] overflow-y-scroll'>
        <div className='relative'>
        <h3 className='font-nunito font-semibold text-lg mb-4'>Groups Request</h3>
        <button  type='button' onClick={handleGroupCreateShow} className='font-nunito font-semibold text-md mb-4 absolute  top-[-3px] right-[-4px] bg-primary py-1 px-3  text-white rounded-sm cursor-pointer'>
            {show ? "Go Back" : "Create Group"}
        </button>
        
       <div className=''>

        {show
        ?
        <div className="mt-10">
            <div className="mb-5">
                <input value={groupname} onChange={hangleChangeGroupname} type="text" placeholder='Group Name' className='border border-solid w-full p-3 rounded outline-0 ' />
                {groupnameErr && <p className=' mt-1 bg-red-400 text-white px-5 rounded'>{groupnameErr}</p> }
            </div>
            <div className="mb-5">
                <input value={groupTagline} onChange={hangleChangeGroupTagline} type="text" placeholder='Group Tagline' className='border border-solid w-full p-3 rounded outline-0 ' />
                {groupTaglineErr && <p className=' mt-1 bg-red-400 text-white px-5 rounded'>{groupTaglineErr}</p> }
            </div>
            <button onClick={handleGroupCreate} className='w-full bg-primary rounded font-nunito font-semibold text-lg text-white py-3 '>create</button>
        </div>
        :
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
                <button onClick={()=>handleGroupJoin(item)} className='bg-primary py-2 px-5 text-lg font-semibold text-white rounded-lg '>Join</button>
            </div>
        </div>
            ))
            
        }
            
            
       </div>
    </div>
    </div>
  )
}

export default GroupRequest
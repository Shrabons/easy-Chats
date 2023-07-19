import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";


const MyGroup = () => {
    const db = getDatabase();

    let [mygroup, setMygroup] = useState([])
    let [mygroupresquet, setMygroupResquet] = useState([])
    let [mygroupmembers, setMygroupmembers] = useState([])
    let [show, setShow] = useState(false)
    let [showmembers, setShowmembers] = useState(false)
    
    let data = useSelector((state)=> state.getInitialState.userInfo)

    // group callection coming data 
    useEffect(()=>{
        const groupRef = ref(db, 'groups/' );
        onValue(groupRef, (snapshot) => {
        let arr = []
          snapshot.forEach((item)=>{
            if(data.uid == item.val().adminid){
                arr.push({...item.val(), key: item.key})
            }
          })
          setMygroup(arr)
        });
    },[])

    // group delete 
    
    let handleMyGroupDelete = (item) => {
        remove(ref(db, 'groups/' + item.key))
    }

    // useEffect(()=>{
    //     const groupRef = ref(db, 'groupjoinrequest/' );
    //     onValue(groupRef, (snapshot) => {
    //     let arr = []
    //       snapshot.forEach((item)=>{
    //         if(data.uid == item.val().adminid ){
    //             arr.push({...item.val(), key: item.key})
    //         }
    //       })
    //       setMygroupResquet(arr)
    //     });
    // },[])

    // group request working now 

    let handleGroupRequest = (gritem) =>{
        setShow(true)
        const groupRef = ref(db, 'groupjoinrequest/' );
        onValue(groupRef, (snapshot) => {
        let arr = []
          snapshot.forEach((item)=>{
            if(data.uid == item.val().adminid && item.val().groupid == gritem.key){
                arr.push({...item.val(), key: item.key})
            }
          })
          setMygroupResquet(arr)
        });
    }

    // accept functionalty working 
    let handleGroupAccept = (item) =>{
        set(push(ref(db, "groupnembers/")),{
            adminid: item.adminid,
            groupid: item.groupid,
            userid: item.userid,
            adminname: item.adminname,
            username: item.username,
            groupname: item.groupname
        }).then(()=>{
            remove(ref(db, 'groupjoinrequest/' + item.key))
        })
    }

    let handleGroupReject = (item) =>{
        remove(ref(db, 'groupjoinrequest/' + item.key))
    }

    // groupnembers callection coming data 
    let handleGroupAllMembers = (memberitem) =>{
        setShowmembers(true)
        const groupRef = ref(db, 'groupnembers/' );
        onValue(groupRef, (snapshot) => {
        let arr = []
          snapshot.forEach((item)=>{
            if(data.uid == memberitem.adminid && memberitem.key == item.val().groupid){
                arr.push({...item.val(), key: item.key})
            }
            
          })
          setMygroupmembers(arr)
        });
    }
    
  return (
    <div className='w-full bg-white rounded-lg shadow-lg py-3 px-4 mt-11 h-[347px] overflow-y-scroll'>
        <div className='relative'>
            <h3 className='font-nunito font-semibold text-lg mb-4'>My Groups</h3>
            {show && 
            <button onClick={()=>setShow(!show)} className='bg-primary py-2 px-3 text-md  absolute  top-[-3px] right-[-4px] font-semibold text-white rounded '>
                Go Back
            </button>
            
            }
            {
                showmembers && 
                <button onClick={()=>setShowmembers(!showmembers)
                
                } className='bg-primary py-2 px-3 text-md  absolute  top-[-3px] right-[-4px] font-semibold text-white rounded '>
                    Go Back
                </button>
            }
            
            <div className=''>
                {mygroup.length == 0
                ?(
                <p className=' mt-2 bg-red-400 text-white px-5 py-4 rounded'>NO Group Available</p>
                ):(

                show
                ?(
                    mygroupresquet.map((item, index)=>(
                        <div key={index} className="flex gap-x-2 items-center border-b-2 pb-3 mb-3">
                            <div className="w-1/5">
                                <img src="images/group1.png" alt="group1" />
                            </div>
                            <div className="w-2/5">
                                <h3 className='font-nunito font-semibold text-lg capitalize'>{item.username}</h3>
                            </div>
                            <div className="w-2/5 flex">
                            <button onClick={()=>handleGroupAccept(item)} className='bg-primary py-2 px-3 text-sm font-semibold text-white rounded ml-1'>Accept</button>
                            <button onClick={()=>handleGroupReject(item)} className='bg-red-500 py-2 px-3 text-sm font-semibold text-white rounded ml-1'>Reject</button>
                            </div>
                        </div>
                    ))
                ): showmembers ? (

                   mygroupmembers.map((item, index)=>(
                        <div key={index} className="flex gap-x-2 items-center border-b-2 pb-3 mb-3">
                            <div className="w-1/5">
                                <img src="images/group1.png" alt="group1" />
                            </div>
                            <div className="w-2/5">
                                <h3 className='font-nunito font-semibold text-lg capitalize'>{item.username}</h3>
                            </div>
                            <div className="w-2/5 flex">
                            <button onClick={()=>handleGroupAccept(item)} className='bg-primary py-2 px-3 text-sm font-semibold text-white rounded ml-1'>Accept</button>
                            <button onClick={()=>handleGroupReject(item)} className='bg-red-500 py-2 px-3 text-sm font-semibold text-white rounded ml-1'>Reject</button>
                            </div>
                        </div>
                    ))

                ):(

                    mygroup.map((item, index)=>(
                        <div key={index} className="flex gap-x-2 items-center border-b-2 pb-3 mb-3">
                            <div className="w-1/5">
                                <img src="images/group1.png" alt="group1" />
                            </div>
                            <div className="w-2/5">
                                <p className='font-nunito font-semibold text-[12px] text-[#1e1d1d] '>Admin: {item.adminname}</p>
                                <h3 className='font-nunito font-semibold text-lg capitalize'>{item.groupname}</h3>
                                <p className='font-nunito font-normal text-md text-[#4D4D4D]'>{item.grouptagline}</p>
                            </div>
                            <div className="w-2/5 flex">
                            
                            <button onClick={()=>handleGroupAllMembers(item)} className='bg-primary py-2 px-3 text-sm font-semibold text-white rounded '>Info</button>
                            <button onClick={()=>handleGroupRequest(item)} className='bg-primary py-2 px-3 text-sm font-semibold text-white rounded ml-1'>request</button>
                            <button onClick={()=>handleMyGroupDelete(item)} className='bg-red-500 py-2 px-3 text-sm font-semibold text-white rounded ml-1'>Delete</button>
                            </div>
                        </div>
                    ))
                    
                    )

                )}
                
               
                
            </div>
        </div>
    </div>
  )
}

export default MyGroup
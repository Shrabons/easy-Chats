import { getAuth } from "firebase/auth";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import React, { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useSelector } from "react-redux";


const UserLists = () => {
    const auth = getAuth()
    const db = getDatabase();
    let data = useSelector((state)=> state.getInitialState.userInfo)
    console.log(data.photoURL)
    

    let [userlist, setUserlist] = useState([])
    let [firentrequestlist, setFirentrequestlist] = useState([])
    let [searchfriend, setSearchfriend] = useState([])
    let [firend, setFirend] = useState([])

    
//  ..............................   
// user list working 
    useEffect(()=>{
        const userRef = ref(db, 'users/' );
        onValue(userRef, (snapshot) => {
        let arr = []
          snapshot.forEach((item)=>{
            if(data.uid != item.key){
                arr.push({...item.val(), userid: item.key})
            }
          })
          setUserlist(arr)
        });
    },[])

    const handleFreindRequest = (item) =>{
        set(push(ref(db, 'firendrequest/' )), {
            sendername: data.displayName,
            senderid: data.uid,
            senderimg: auth.currentUser.photoURL,
            recivername: item.username,
            reciverid : item.userid,
            reciverimg: item.imgurl
          });
    }


//  ..............................   
// firendrequest list working 
    useEffect(()=>{
        const firendrequestRef = ref(db, 'firendrequest/' );
        onValue(firendrequestRef, (snapshot) => {
        let arr = []
          snapshot.forEach((item)=>{
            arr.push(item.val().reciverid + item.val().senderid)
          })
          setFirentrequestlist(arr)
        });
    },[])
    

//  ..............................   
// firend list working 
    useEffect(()=>{
      const firendRef = ref(db, 'firends/' );
      onValue(firendRef, (snapshot) => {
      let arr = []
        snapshot.forEach((item)=>{
          arr.push(item.val().reciverid + item.val().senderid)
        })
        setFirend(arr)
      });
  },[])


  // searching function working 
  let heandleSearch = (e) =>{
    let searchArr = []
  if(e.target.value.length == 0){
    setSearchfriend([])
  }else{
    userlist.filter((item)=>{
      if(item.username.toLowerCase().includes(e.target.value.toLowerCase())){
        searchArr.push(item)
        setSearchfriend(searchArr)
      }
    })
  }
 
  // userlist.filter((item)=>{
  //   if(item.username.toLowerCase().includes(e.target.value.toLowerCase())){
  //     searchArr.push(item)
  //   }
  //   setSearchfriend(searchArr)
  // })
}
    
  return (
    <div className='w-full bg-white rounded-lg shadow-lg py-3 px-4 mt-11 h-[365px] overflow-y-scroll'>
        <div className='relative'>
            <h3 className='font-nunito font-semibold text-lg mb-4'>User Lists</h3>
            <BsThreeDotsVertical className='absolute text-lg top-[6px] right-[0px]' />
            <input onChange={heandleSearch} className='w-full py-[12px] pl-5 mb-6 rounded-2xl shadow-xl' type="text" placeholder='Search' />
            <div className=''>
              {searchfriend.length > 0 
              ?
              searchfriend.map((item, index)=>(
                <div key={index} className="flex gap-x-2 items-center border-b-2 pb-3 mb-3">
                    <div className="w-1/5">
                        <img className="w-[70px] h-[70px] rounded-full" src={item.imgurl} alt="group1" />
                    </div>
                    <div className="w-3/5">
                        <h3 className='font-nunito font-semibold text-lg'>{item.username} </h3>
                        <p className='font-nunito font-normal text-sm text-[#4D4D4D]'>{item.email}</p>
                    </div>
                    <div className="w-1/5">
                      {firend.includes(item.userid+data.uid) || firend.includes(data.uid+item.userid)
                      ?
                      <button  className='bg-primary py-2 px-5 text-lg font-semibold text-white rounded-lg '> F--s</button>
                      :
                      firentrequestlist.includes(item.userid+data.uid) || firentrequestlist.includes(data.uid+item.userid)
                        ?(
                        <button  className='bg-primary py-2 px-5 text-lg font-semibold text-white rounded-lg '> request</button>
                        ):(
                        <button onClick={()=>handleFreindRequest(item)} className='bg-primary py-2 px-5 text-lg font-semibold text-white rounded-lg '> Add</button>
                        )
                      }
                       
                    </div>
                </div>
            ))
              :
                userlist.map((item, index)=>(
                  <div key={index} className="flex gap-x-2 items-center border-b-2 pb-3 mb-3">
                      <div className="w-1/5">
                          <img className="w-[70px] h-[70px] rounded-full" src={item.imgurl} alt="group1" />
                      </div>
                      <div className="w-3/5">
                          <h3 className='font-nunito font-semibold text-lg'>{item.username} </h3>
                          <p className='font-nunito font-normal text-sm text-[#4D4D4D]'>{item.email}</p>
                      </div>
                      <div className="w-1/5">
                        {firend.includes(item.userid+data.uid) || firend.includes(data.uid+item.userid)
                        ?
                        <button  className='bg-primary py-2 px-5 text-lg font-semibold text-white rounded-lg '> F--s</button>
                        :
                        firentrequestlist.includes(item.userid+data.uid) || firentrequestlist.includes(data.uid+item.userid)
                          ?(
                          <button  className='bg-primary py-2 px-5 text-lg font-semibold text-white rounded-lg '> request</button>
                          ):(
                          <button onClick={()=>handleFreindRequest(item)} className='bg-primary py-2 px-5 text-lg font-semibold text-white rounded-lg '> Add</button>
                          )
                        }
                        
                      </div>
                  </div>
              ))
              }
                {}
            </div>
        </div>
    </div>
  )
}

export default UserLists
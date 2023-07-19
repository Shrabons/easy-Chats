import { getDatabase, onValue, push, ref, set } from "firebase/database";
import React, { useEffect, useState } from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { AiOutlineClose } from 'react-icons/ai';
import { BsCameraFill, BsFillMicFill, BsFillSendFill, BsThreeDotsVertical, BsTriangleFill } from 'react-icons/bs';
import { GrGallery } from 'react-icons/gr';
import { useSelector } from 'react-redux';



const Chats = () => {

    const db = getDatabase();
    let [camerashow , setCamerShow] = useState(false)
    let [captureimg , setCaptureimg] = useState("")
    let [msgsingle , setMsgsingle] = useState("")
    let [msglist , setMsglist] = useState([])

    const data = useSelector((state) => state.reducer.userInfo)
    const activeChatName = useSelector((state) => state.reducer.active)
    console.log(activeChatName)

   
   

    let hanldemsgCase = (e) => {
        setMsgsingle(e.target.value)
    }
    
    
    function handleTakePhoto (dataUri) {
        // Do stuff with the photo...
        console.log('takePhoto');
        setCaptureimg(dataUri);
      }
    


      let handleMsgSend = () =>{
        if(activeChatName.status == "single"){
            set(push(ref(db, 'singlemsg/')), {
                whosendid: data.uid,
                whosendname: data.displayName,
                whoreciveid: activeChatName.id,
                whorecivename: activeChatName.name,
                msg: msgsingle,
                date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()} : ${new Date().getMinutes()}`
              });
              setMsgsingle("")
            
        }else{
            console.log( "ami group msg theke aseci")
        }

        
      }

    useEffect(()=>{
        const singlemsgRef = ref(db, 'singlemsg/' );
        onValue(singlemsgRef, (snapshot) => {
        let masArr = []
          snapshot.forEach((item)=>{
            if(item.val().whosendid == data.uid && item.val().whoreciveid == activeChatName.id || item.val().whoreciveid == data.uid && item.val().whosendid == activeChatName.id){
                masArr.push(item.val())
            }
          })
          setMsglist(masArr)
        });
    },[activeChatName.id])

    let handleImgChanges = (e) =>{
        console.log(e.target)
    }

  return (
    <div className='bg-white shadow-lg rounded-xl py-6 px-12 '>
        <div className='flex items-center gap-x-8 border-b border-solid border-[rgba(0,0,0,.25)] pb-6 relative mb-14'>
            <BsThreeDotsVertical className='text-2xl absolute top-[36px] right-[0px] text-primary' />
            <div className="imag w-[80px] h-[80px] rounded-full shadow-lg relative">
                <img className='w-full' src="images/group3.png" alt="" />
                <div className="w-[17px] h-[17px] rounded-full bg-green-400 border-2 border-solid border-black absolute bottom-[16px] right-[-4px]"></div>
            </div>
            <div className="title">
                <h3 className='font-pop font-semibold text-2xl capitalize'>{activeChatName.name}</h3>
                <p className='font-pop  text-sm capitalize'>online</p>
            </div>
        </div>
        <div className=' border-b border-solid border-[rgba(0,0,0,.25)]'>
            <div className='overflow-y-scroll h-[500px] mb-7'>
                {activeChatName.status == "single"
                ?
                msglist.map((item, index)=>(
                    item.whosendid == data.uid 
                    ?
                    
                    <div className='mb-8 text-right'>
                        <div className='bg-primary inline-block py-3 px-10 rounded-md relative mx-5'>
                            <p className='font-pop font-medium text-base text-white text-left'>{item.msg}</p>
                            <BsTriangleFill className='text-2xl absolute bottom-[-1.4px] right-[-10px]  text-primary' />
                        </div>
                        <p className=' mr-5 font-pop ml-5 font-medium text-sm mt-1 text-[rgba(0,0,0,.25)]'>Today, 2:01pm</p>
                    </div> 
                    :
                    <div className='mb-8'>
                        <div className='bg-[#F1F1F1] inline-block py-3 px-10 rounded-md relative mx-5'>
                            <p className='font-pop font-medium text-base text-black'>{item.msg}</p>
                            <BsTriangleFill className='text-2xl absolute bottom-[-1.5px] left-[-10px]  text-[#F1F1F1] ' />
                        </div>
                        <p className='font-pop ml-5 font-medium text-sm mt-1 text-[rgba(0,0,0,.25)]'>Today, 2:01pm</p>
                    </div> 
                ))
                :
                <h1>this is a group sms</h1>
                }

                {/* received msg start  */}
                {/* <div className='mb-8'>
                    <div className='bg-[#F1F1F1] inline-block py-3 px-10 rounded-md relative mx-5'>
                        <p className='font-pop font-medium text-base text-black'>How are you doing?</p>
                        <BsTriangleFill className='text-2xl absolute bottom-[-1.5px] left-[-10px]  text-[#F1F1F1] ' />
                    </div>
                    <p className='font-pop ml-5 font-medium text-sm mt-1 text-[rgba(0,0,0,.25)]'>Today, 2:01pm</p>
                </div> */}
                {/* received msg end  */}
                
                {/* send msg start  */}
                {/* <div className='mb-8 text-right'>
                    <div className='bg-primary inline-block py-3 px-10 rounded-md relative mx-5'>
                        <p className='font-pop font-medium text-base text-white text-left'>Hello...</p>
                        <BsTriangleFill className='text-2xl absolute bottom-[-1.4px] right-[-10px]  text-primary' />
                    </div>
                    <p className=' mr-5 font-pop ml-5 font-medium text-sm mt-1 text-[rgba(0,0,0,.25)]'>Today, 2:01pm</p>
                </div> */}
                {/* send msg end  */}
                {/* send msg start  */}
                {/* <div className='mb-8 text-right'>
                    <div className='bg-primary inline-block py-3 px-10 rounded-md relative mx-5'>
                        <p className='font-pop font-medium text-base text-white text-left'>I am good  and hoew about you?</p>
                        <BsTriangleFill className='text-2xl absolute bottom-[-1.4px] right-[-10px]  text-primary' />
                    </div>
                    <p className=' mr-5 font-pop ml-5 font-medium text-sm mt-1 text-[rgba(0,0,0,.25)]'>Today, 2:01pm</p>
                </div> */}
                {/* send msg end  */}
                {/* received img start  */}
                {/* <div className='mb-8'>
                    <div className=' inline-block  w-72 rounded-md relative mx-5'>
                        <ModalImage className='rounded-md'
                        small={`images/login-pic.png`}
                        large={`images/login-pic.png`}
                        />
                    </div>
                    <p className='font-pop ml-5 font-medium text-sm  text-[rgba(0,0,0,.25)]'>Today, 2:01pm</p>
                </div> */}
                {/* received img end  */}
                {/* send img start  */}
                {/* <div className='mb-8 text-right'>
                    <div className=' inline-block w-72 rounded-md relative mx-5'>
                        <ModalImage className='rounded-md'
                        small={`images/login-pic.png`}
                        large={`images/login-pic.png`}
                        />;
                    </div>
                    <p className=' mr-5 font-pop ml-5 font-medium text-sm  text-[rgba(0,0,0,.25)]'>Today, 2:01pm</p>
                </div> */}
                {/* send img end  */}
                
                {/* received img start  */}
                {/* <div className='mb-8'>
                    <div className=' inline-block  w-72 rounded-md relative mx-5'>
                        <ModalImage className='rounded-md'
                        small={`images/profile-img.png`}
                        large={`images/profile-img.png`}
                        />
                    </div>
                    <p className='font-pop ml-5 font-medium text-sm  text-[rgba(0,0,0,.25)]'>Today, 2:01pm</p>
                </div> */}
                {/* received img end  */}
                {/* send audio start  */}
                {/* <div className='mb-8 text-right'>
                    <div className=' inline-block w-72 rounded-md relative mx-5'>
                        <audio controls></audio>
                    </div>
                    <p className=' mr-5 font-pop ml-5 font-medium text-sm  text-[rgba(0,0,0,.25)]'>Today, 2:01pm</p>
                </div> */}
                {/* send audio end  */}
                
                {/* received audio start  */}
                {/* <div className='mb-8'>
                    <div className=' inline-block  w-72 rounded-md relative mx-5'>
                        <audio controls></audio>
                    </div>
                    <p className='font-pop ml-5 font-medium text-sm  text-[rgba(0,0,0,.25)]'>Today, 2:01pm</p>
                </div> */}
                {/* received audio end  */}
                {/* send video start  */}
                {/* <div className='mb-8 text-right'>
                    <div className=' inline-block w-72 rounded-md relative mx-5'>
                        <video controls></video>
                    </div>
                    <p className=' mr-5 font-pop ml-5 font-medium text-sm  text-[rgba(0,0,0,.25)]'>Today, 2:01pm</p>
                </div> */}
                {/* send video end  */}
                
                {/* received video start  */}
                {/* <div className='mb-8'>
                    <div className=' inline-block  w-72 rounded-md relative mx-5'>
                        <video controls></video>
                    </div>
                    <p className='font-pop ml-5 font-medium text-sm  text-[rgba(0,0,0,.25)]'>Today, 2:01pm</p>
                </div> */}
                {/* received video end  */}
            </div>
        </div>
        <div className=' flex mt-8 gap-x-5'>
            <div className="w-[90%] relative">
                <input value={msgsingle} onChange={hanldemsgCase} type="text" className='bg-[#f1f1f1] p-3  w-full rounded-lg'  />
                <label>
                    <input onChange={handleImgChanges} className='hidden' type="file" />
                    <GrGallery className='absolute top-4 right-3' />
                </label>
                <BsCameraFill onClick={()=>setCamerShow(!camerashow)} className='absolute top-4 right-10 text-lg pointer' />
                <BsFillMicFill  className='absolute top-4 right-[72px]  ' />
                
                
            </div>
            {camerashow &&
                    <div className='w-full h-screen absolute top-0 left-0 bg-[rgba(0,0,0,.85)] z-100 flex justify-center items-center'>
                        <AiOutlineClose onClick={()=>setCamerShow(false)} className='text-3xl absolute top-6 right-5 text-white pointer' />
                        <Camera
                        onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
                        idealFacingMode = {FACING_MODES.ENVIRONMENT}
                        idealResolution = {{width: 640, height: 480}}
                        imageType = {IMAGE_TYPES.JPG}
                        imageCompression = {0.97}
                        isMaxResolution = {true}
                        isImageMirror = {true}
                        isSilentMode = {false}
                        isDisplayStartCameraError = {true}
                        isFullscreen = {false}
                        sizeFactor = {1}
                        />
                    </div>
                }
            <button onClick={handleMsgSend} className='bg-primary py-3 px-6 rounded-lg '><BsFillSendFill className='text-2xl text-white' /></button>
        </div>
    </div>
  )
}

export default Chats
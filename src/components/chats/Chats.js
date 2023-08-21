import EmojiPicker from 'emoji-picker-react';
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { getDownloadURL, getStorage, ref as sref, uploadBytes, uploadBytesResumable, uploadString } from "firebase/storage";
import moment from "moment/moment";
import React, { useEffect, useState } from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { AiFillDelete, AiOutlineClose } from 'react-icons/ai';
import { BsCameraFill, BsFillEmojiSmileFill, BsFillSendFill, BsThreeDotsVertical, BsTriangleFill } from 'react-icons/bs';
import { GrGallery } from 'react-icons/gr';
import ModalImage from "react-modal-image";
import { useSelector } from 'react-redux';
import ScrollToBottom from 'react-scroll-to-bottom';



const Chats = () => {


    const storage = getStorage();
    const db = getDatabase();
    let [camerashow , setCamerShow] = useState(false)
    let [captureimg , setCaptureimg] = useState("")
    let [msgsingle , setMsgsingle] = useState("")
    let [msglist , setMsglist] = useState([])
    let [gmsglist , setGmsglist] = useState([])
    let [groupmemberlist , setGroupmemberlist] = useState([])
    let [audioUrl , setAudioUrl] = useState("")
    let [blob , setBlob] = useState("")
    let [emojishow , setEmojishow] = useState(false)


    const data = useSelector((state) => state.reducer.userInfo)
    const activeChatName = useSelector((state) => state.reducer.active)
   
    console.log(activeChatName)
    console.log(data.uid)

   
   

    let hanldemsgCase = (e) => {
        setMsgsingle(e.target.value)
        
    }
    let handleEnterPress = (e) => {
    
        if(e.key == "Enter"){
            handleMsgSend()
        }
    }
    
    // screen short img captucher function single msg
    function handleTakePhoto (dataUri) {
        // Do stuff with the photo...
     
        setCaptureimg(dataUri);
        const storageRef = sref(storage,"thik ace ki nah");
        uploadString(storageRef, dataUri, 'data_url').then((snapshot) => {
            console.log('Uploaded a data_url string!');
            getDownloadURL(storageRef).then((downloadURL) => {
                console.log('File available at', downloadURL);
                set(push(ref(db, 'singlemsg/')), {
                    whosendid: data.uid,
                    whosendname: data.displayName,
                    whoreciveid: activeChatName.id,
                    whorecivename: activeChatName.name,
                    img: downloadURL,
                    date: `${new Date().getFullYear()} ${new Date().getMonth()+1} ${new Date().getDate()} ${new Date().getHours()} : ${new Date().getMinutes()}`,
                  }).then(()=>{
                    setCamerShow(false)
                  })
                
            });
        });
      }

          // screen short img captucher function single msg
    function handleTakePhotoGroup (dataUri) {
        // Do stuff with the photo...
        console.log('takePhoto group');
        setCaptureimg(dataUri);
        const storageRef = sref(storage,"thik ace ki nah");
        uploadString(storageRef, dataUri, 'data_url').then((snapshot) => {
            console.log('Uploaded a data_url string!');
            getDownloadURL(storageRef).then((downloadURL) => {
                console.log('File available at', downloadURL);
                set(push(ref(db, 'groupmsg/')), {
                    whosendid: data.uid,
                    whosendname: data.displayName,
                    whoreciveid: activeChatName.id,
                    whorecivename: activeChatName.name,
                    img: downloadURL,
                    date: `${new Date().getFullYear()} ${new Date().getMonth()+1} ${new Date().getDate()} ${new Date().getHours()} : ${new Date().getMinutes()}`,
                  }).then(()=>{
                    setCamerShow(false)
                  })
                
            });
        });
      }
    


      let handleMsgSend = () =>{
        if(activeChatName.status == "single"){
            if(!msgsingle){
                console.log("Enter the message !")
            }else{
                set(push(ref(db, 'singlemsg/')), {
                    whosendid: data.uid,
                    whosendname: data.displayName,
                    whoreciveid: activeChatName.id,
                    whorecivename: activeChatName.name,
                    msg: msgsingle,
                    date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()} : ${new Date().getMinutes()}`
                  }).then(()=>{
                      setMsgsingle("")
                  });
            }
            
        }else{
            set(push(ref(db, 'groupmsg/')), {
                whosendid: data.uid,
                whosendname: data.displayName,
                whoreciveid: activeChatName.id,
                whorecivename: activeChatName.name,
                adminid: activeChatName.adminid,
                msg: msgsingle,
                date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()} : ${new Date().getMinutes()}`
              }).then(()=>{
                  setMsgsingle("")
              });
              console.log( "ami group msg theke aseci")
        }

        
      }

      let handleThumupSend = () =>{
        console.log('thumup')
        if(activeChatName.status == "single"){
            
            set(push(ref(db, 'singlemsg/')), {
            whosendid: data.uid,
            whosendname: data.displayName,
            whoreciveid: activeChatName.id,
            whorecivename: activeChatName.name,
            msg: '&#128077;',
            date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()} : ${new Date().getMinutes()}`
            }).then(()=>{
                setMsgsingle("")
            });
            
            
        }else{
            set(push(ref(db, 'groupmsg/')), {
                whosendid: data.uid,
                whosendname: data.displayName,
                whoreciveid: activeChatName.id,
                whorecivename: activeChatName.name,
                adminid: activeChatName.adminid,
                msg: "&#128077;",
                date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()} : ${new Date().getMinutes()}`
              }).then(()=>{
                  setMsgsingle("")
              });
              console.log( "ami group msg theke aseci")
        }
      }

// single sms niye asa data theke 
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

    // group sms niye asa data theke 
    useEffect(()=>{
        const groupmsgRef = ref(db, 'groupmsg/' );
        onValue(groupmsgRef, (snapshot) => {
        let masArr = []
          snapshot.forEach((item)=>{
                masArr.push(item.val())
          })
          setGmsglist(masArr)
        });
    },[activeChatName.id])

     // group nembers niye asa data theke 
     useEffect(()=>{
        const groupmembersgRef = ref(db, 'groupnembers/' );
        onValue(groupmembersgRef, (snapshot) => {
        let masArr = []
          snapshot.forEach((item)=>{
                masArr.push(item.val().groupid+item.val().userid)
                console.log(item.val().groupid+item.val().userid)
          })
          setGroupmemberlist(masArr)
        });
    },[])


// img file updating single sms  
    let handleImgUpChanges = (e) =>{
        console.log(e.target.files[0])
        if(!e.target.files[0]){
            console.log("your file not a select !")
        }else{
            const storageRef = sref(storage, e.target.files[0].name);

            const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
            uploadTask.on('state_changed', 
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                
                
            }, 
            (error) => {
                console.log(error)
            }, 
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);  
                set(push(ref(db, 'singlemsg/')), {
                    whosendid: data.uid,
                    whosendname: data.displayName,
                    whoreciveid: activeChatName.id,
                    whorecivename: activeChatName.name,
                    img: downloadURL,
                    date: `${new Date().getFullYear()} ${new Date().getMonth()+1} ${new Date().getDate()} ${new Date().getHours()} : ${new Date().getMinutes()}`,
                  });
                });
            }
            );
        }
        
    }


// img file updating grpup sms  
let handleImgUpChangesGroup = (e) =>{
    console.log(e.target.files[0])
    if(!e.target.files[0]){
        console.log("your file not a select !")
    }else{
        const storageRef = sref(storage, e.target.files[0].name);

        const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
        uploadTask.on('state_changed', 
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            
            
        }, 
        (error) => {
            console.log(error)
        }, 
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);  
            set(push(ref(db, 'groupmsg/')), {
                whosendid: data.uid,
                whosendname: data.displayName,
                whoreciveid: activeChatName.id,
                whorecivename: activeChatName.name,
                img: downloadURL,
                date: `${new Date().getFullYear()} ${new Date().getMonth()+1} ${new Date().getDate()} ${new Date().getHours()} : ${new Date().getMinutes()}`,
              });
            });
        }
        );
    }
    
}


// recoding function working 
const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    setAudioUrl(url)
    setBlob(blob)


  };

// single msg  audio submit data base function working 

 let handleAudioUpdate = () =>{
    const audioStorageRef = sref(storage, audioUrl);

    // 'file' comes from the Blob or File API
    uploadBytes(audioStorageRef, blob).then((snapshot) => {
        getDownloadURL(audioStorageRef).then((downloadURL) => {
            console.log('Audio url', downloadURL);
            set(push(ref(db, 'singlemsg/')), {
                whosendid: data.uid,
                whosendname: data.displayName,
                whoreciveid: activeChatName.id,
                whorecivename: activeChatName.name,
                audio: downloadURL,
                date: `${new Date().getFullYear()} ${new Date().getMonth()+1} ${new Date().getDate()} ${new Date().getHours()} : ${new Date().getMinutes()}`,
              }).then(()=>{
                setAudioUrl("")
              })
        });
  
    });
 }

 // group msg  audio submit data base function working 

 let handleAudioUpdateGroup = () =>{
    const audioStorageRef = sref(storage, audioUrl);

    // 'file' comes from the Blob or File API
    uploadBytes(audioStorageRef, blob).then((snapshot) => {
        getDownloadURL(audioStorageRef).then((downloadURL) => {
            console.log('Audio url', downloadURL);
            set(push(ref(db, 'groupmsg/')), {
                whosendid: data.uid,
                whosendname: data.displayName,
                whoreciveid: activeChatName.id,
                whorecivename: activeChatName.name,
                audio: downloadURL,
                date: `${new Date().getFullYear()} ${new Date().getMonth()+1} ${new Date().getDate()} ${new Date().getHours()} : ${new Date().getMinutes()}`,
              }).then(()=>{
                setAudioUrl("")
              })
        });
  
    });
 }

 let handleEmojiCase =(emojis)=>{
    // console.log(emojis.emoji)
    setMsgsingle(msgsingle+emojis.emoji)
 }

  return (
    <div className='bg-white shadow-lg rounded-xl py-6 px-12 '>
        <div className='flex items-center gap-x-8 border-b border-solid border-[rgba(0,0,0,.25)] pb-6 relative mb-14'>
            <BsThreeDotsVertical className='text-2xl absolute top-[36px] right-[0px] text-primary' />
            <div className="imag w-[80px] h-[80px] rounded-full shadow-lg relative">
                <img className=' w-[80px] h-[80px] rounded-full' src={activeChatName.imgUlr} alt="" />
                <div className="w-[17px] h-[17px] rounded-full bg-green-400 border-2 border-solid border-black absolute bottom-[16px] right-[-4px]"></div>
            </div>
            <div className="title">
                <h3 className='font-pop font-semibold text-2xl capitalize'>{activeChatName.name}</h3>
                <p className='font-pop  text-sm capitalize'>online</p>
            </div>
        </div>
        <div className=' border-b border-solid border-[rgba(0,0,0,.25)]'>
            <ScrollToBottom className='overflow-y-scroll h-[500px] mb-7 '>
                {activeChatName.status == "single"
                ?
                msglist.map((item, index)=>(
                    item.whosendid == data.uid ?
                        item.msg ?
                        <div className='mb-8 text-right '>
                            <div className='bg-primary inline-block py-3 px-10 rounded-md relative mx-5'>
                                <p dangerouslySetInnerHTML={{__html: item.msg}}  className='font-pop font-medium text-base text-white text-left'></p>
                                <BsTriangleFill className='text-2xl absolute bottom-[-1.4px] right-[-10px]  text-primary' />
                            </div>
                            <p className=' mr-5 font-pop ml-5 font-medium text-sm mt-1  text-[rgba(0,0,0,.25)]'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
                        </div> 
                        : 
                        item.img ?
                        <div className='mb-8 text-right'>
                            <div className=' inline-block w-72 rounded-md relative mx-5'>
                                <ModalImage className='rounded-md'
                                small={item.img}
                                large={item.img}
                                />
                            </div>
                            <p className=' mr-5 font-pop ml-5 font-medium text-sm  text-[rgba(0,0,0,.25)]'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
                        </div> 
                        :
                        <div className='mb-8 text-right'>
                            <div className=' inline-block w-72 rounded-md relative mx-5'>
                                <audio controls src={item.audio}></audio>
                            </div>
                            <p className=' mr-5 font-pop ml-5 font-medium text-sm  text-[rgba(0,0,0,.25)]'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
                        </div> 
                    :
                        item.msg ?
                        <div className='mb-8'>
                            <div className='bg-[#F1F1F1] inline-block py-3 px-10 rounded-md relative mx-5'>
                                <p dangerouslySetInnerHTML={{__html: item.msg}} className='font-pop font-medium text-base text-black'></p>
                                <BsTriangleFill className='text-2xl absolute bottom-[-1.5px] left-[-10px]  text-[#F1F1F1] ' />
                            </div>
                            <p className='font-pop ml-5 font-medium text-sm mt-1 text-[rgba(0,0,0,.25)]'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
                        </div> 
                        :
                        item.img ?
                        <div className='mb-8'>
                            <div className=' inline-block  w-72 rounded-md relative mx-5'>
                                <ModalImage className='rounded-md'
                                small={item.img}
                                large={item.img}
                                />
                            </div>
                            <p className='font-pop ml-5 font-medium text-sm  text-[rgba(0,0,0,.25)]'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
                        </div> 
                        :
                        <div className='mb-8'>
                            <div className=' inline-block  w-72 rounded-md relative mx-5'>
                                <audio controls src={item.audio}></audio>
                            </div>
                            <p className='font-pop ml-5 font-medium text-sm  text-[rgba(0,0,0,.25)]'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
                        </div> 
                    
                ))
                :
                data.uid == activeChatName.adminid || groupmemberlist.includes(activeChatName.id + data.uid)  ?
                
                    gmsglist.map((item, index)=>(
                        item.whosendid == data.uid ?
                            item.msg ?
                            item.whoreciveid == activeChatName.id &&
                            <div className='mb-8 text-right '>
                                <div className='bg-primary inline-block py-3 px-10 rounded-md relative mx-5'>
                                    <p dangerouslySetInnerHTML={{__html: item.msg}}  className='font-pop font-medium text-base text-white text-left'></p>
                                    <BsTriangleFill className='text-2xl absolute bottom-[-1.4px] right-[-10px]  text-primary' />
                                </div>
                                <p className=' mr-5 font-pop ml-5 font-medium text-sm mt-1  text-[rgba(0,0,0,.25)]'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
                            </div>
                            :
                            item.img ?
                            item.whoreciveid == activeChatName.id &&
                            <div className='mb-8 text-right'>
                                <div className=' inline-block w-72 rounded-md relative mx-5'>
                                    <ModalImage className='rounded-md'
                                    small={item.img}
                                    large={item.img}
                                    />
                                </div>
                                <p className=' mr-5 font-pop ml-5 font-medium text-sm  text-[rgba(0,0,0,.25)]'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
                            </div>
                            :
                            item.whoreciveid == activeChatName.id &&
                            <div className='mb-8 text-right'>
                                <div className=' inline-block w-72 rounded-md relative mx-5'>
                                    <audio controls src={item.audio}></audio>
                                </div>
                                <p className=' mr-5 font-pop ml-5 font-medium text-sm  text-[rgba(0,0,0,.25)]'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
                            </div> 
                            
                        :
                            item.msg ?
                            item.whoreciveid == activeChatName.id &&
                            <div className='mb-8'>
                                <div className='bg-[#F1F1F1] inline-block py-3 px-10 rounded-md relative mx-5'>
                                    <p dangerouslySetInnerHTML={{__html: item.msg}} className='font-pop font-medium text-base text-black'></p>
                                    <BsTriangleFill className='text-2xl absolute bottom-[-1.5px] left-[-10px]  text-[#F1F1F1] ' />
                                </div>
                                <p className='font-pop ml-5 font-medium text-sm mt-1 text-[rgba(0,0,0,.25)]'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
                            </div>
                            :
                            item.img ?
                            item.whoreciveid == activeChatName.id &&
                            <div className='mb-8'>
                                <div className=' inline-block  w-72 rounded-md relative mx-5'>
                                    <ModalImage className='rounded-md'
                                    small={item.img}
                                    large={item.img}
                                    />
                                </div>
                                <p className='font-pop ml-5 font-medium text-sm  text-[rgba(0,0,0,.25)]'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
                            </div> 
                            :
                            item.whoreciveid == activeChatName.id &&
                            <div className='mb-8'>
                                <div className=' inline-block  w-72 rounded-md relative mx-5'>
                                    <audio controls src={item.audio}></audio>
                                </div>
                                <p className='font-pop ml-5 font-medium text-sm  text-[rgba(0,0,0,.25)]'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
                            </div> 
                    ))
                :
                    <div className='flex justify-center items-center bg-rose-400 h-full text-white'>
                        <h1 className='text-2xl capitalize'>not members in this group</h1>
                    </div>
                    
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
            </ScrollToBottom>
        </div>
        { activeChatName.status == "single" ?
        <div className=' flex mt-8 gap-x-5'>
            <div className="w-[90%] relative">
            
                {!audioUrl && 
                <>
                    <input value={msgsingle} onChange={hanldemsgCase} onKeyUp={handleEnterPress} type="text" className='bg-[#f1f1f1] p-3 pr-[123px]  w-full rounded-lg'  />
                    <label>
                        <input onChange={handleImgUpChanges} className='hidden' type="file" />
                        <GrGallery className='absolute top-4 right-3' />
                    </label>
                    <BsCameraFill onClick={()=>setCamerShow(!camerashow)} className='absolute top-4 right-10 text-lg pointer' />
                    <BsFillEmojiSmileFill onClick={()=> setEmojishow(!emojishow)} className='absolute top-4 right-[95px] ' />
                    {emojishow &&
                        <div className='absolute top-[-456px] right-0'>
                            <EmojiPicker onEmojiClick={(emojis)=>handleEmojiCase(emojis)} />
                        </div>
                    }
                    
                    <AudioRecorder
                        // onClick={handlerecorder}
                        onRecordingComplete={addAudioElement}
                        audioTrackConstraints={{
                        noiseSuppression: true,
                        echoCancellation: true,
                        // autoGainControl,
                        // channelCount,
                        // deviceId,
                        // groupId,
                        // sampleRate,
                        // sampleSize,
                        }}
                        onNotAllowedOrFound={(err) => console.table(err)}
                        downloadOnSavePress={false}
                        downloadFileExtension="webm"
                        mediaRecorderOptions={{
                        audioBitsPerSecond: 128000,
                        }}
                        // showVisualizer={true}
                    />
                </>
                
                }
                
                {audioUrl && 

                <div className=" flex gap-x-5 justify-end">
                    <audio controls src={audioUrl}></audio>
                    <button onClick={()=> setAudioUrl("")} className='bg-red-400 py-3 px-6 rounded-lg '><AiFillDelete className='text-2xl text-white' /></button>
                    <button onClick={handleAudioUpdate} className='bg-primary py-3 px-6 rounded-lg '><BsFillSendFill className='text-2xl text-white' /></button>

                </div>
                }
                
            </div>
            {camerashow &&
                    <div className='w-full h-screen absolute top-0 left-0 bg-[rgba(0,0,0,.85)] z-100 flex justify-center items-center'>
                        <AiOutlineClose onClick={()=>setCamerShow(false)} className='text-3xl absolute top-6 right-5 text-white pointer' />
                        <Camera
                        onTakePhoto = { (dataUri) => {  handleTakePhoto(dataUri)} }
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
            {!audioUrl &&
            
            msgsingle ?
            <button onClick={handleMsgSend} className='bg-primary py-3 px-6 rounded-lg '><BsFillSendFill className='text-2xl text-white' /></button>
            :
            <button onClick={handleThumupSend} className='bg-primary py-1 px-6 rounded-lg text-2xl'>&#128077;</button>
            }
        </div>
        :
        data.uid == activeChatName.adminid || groupmemberlist.includes(activeChatName.id + data.uid)  ?
        <div className=' flex mt-8 gap-x-5'>
            <div className="w-[90%] relative">
                {!audioUrl && 
                <>
                    <input value={msgsingle} onChange={hanldemsgCase} onKeyUp={handleEnterPress} type="text" className='bg-[#f1f1f1] p-3 pr-[123px] w-full rounded-lg'  />
                    <label>
                        <input onChange={msgsingle ? handleImgUpChanges : handleImgUpChangesGroup} className='hidden' type="file" />
                        <GrGallery className='absolute top-4 right-3' />
                    </label>
                    <BsCameraFill onClick={()=>setCamerShow(!camerashow)} className='absolute top-4 right-10 text-lg pointer' />
                    <BsFillEmojiSmileFill onClick={()=> setEmojishow(!emojishow)} className='absolute top-4 right-[95px] ' />
                    {emojishow &&
                        <div className='absolute top-[-456px] right-0'>
                            <EmojiPicker onEmojiClick={(emojis)=>handleEmojiCase(emojis)} />
                        </div>
                    }
                    
                    <AudioRecorder
                        onRecordingComplete={addAudioElement}
                        audioTrackConstraints={{
                        noiseSuppression: true,
                        echoCancellation: true,
                        // autoGainControl,
                        // channelCount,
                        // deviceId,
                        // groupId,
                        // sampleRate,
                        // sampleSize,
                        }}
                        onNotAllowedOrFound={(err) => console.table(err)}
                        downloadOnSavePress={false}
                        downloadFileExtension="webm"
                        mediaRecorderOptions={{
                        audioBitsPerSecond: 128000,
                        }}
                        // showVisualizer={true}
                    />
                </>
                
                }
                
                {audioUrl && 

                <div className=" flex gap-x-5 justify-end">
                    <audio controls src={audioUrl}></audio>
                    <button onClick={()=> setAudioUrl("")} className='bg-red-400 py-3 px-6 rounded-lg '><AiFillDelete className='text-2xl text-white' /></button>
                    <button onClick={handleAudioUpdateGroup} className='bg-primary py-3 px-6 rounded-lg '><BsFillSendFill className='text-2xl text-white' /></button>

                </div>
                }
                
            </div>
            {camerashow &&
                    <div className='w-full h-screen absolute top-0 left-0 bg-[rgba(0,0,0,.85)] z-100 flex justify-center items-center'>
                        <AiOutlineClose onClick={()=>setCamerShow(false)} className='text-3xl absolute top-6 right-5 text-white pointer' />
                        <Camera
                        onTakePhoto = { (dataUri) => {  handleTakePhotoGroup(dataUri) } }
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
            {!audioUrl &&
            msgsingle ?
            <button onClick={handleMsgSend} className='bg-primary py-3 px-6 rounded-lg '><BsFillSendFill className='text-2xl text-white' /></button>
            :
            <button onClick={handleThumupSend} className='bg-primary py-1 px-6 rounded-lg text-2xl'>&#128077;</button>
            
            }
        </div>
        :
        null
         }
    </div>
  )
}

export default Chats
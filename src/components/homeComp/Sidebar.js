import "cropperjs/dist/cropper.css";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { getDatabase, set, ref as storRef } from "firebase/database";
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import React, { useState } from "react";
import Cropper from "react-cropper";
import { AiFillMessage, AiOutlineHome, AiOutlineSetting } from 'react-icons/ai';
import { BsFillCloudUploadFill } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { Vortex } from 'react-loader-spinner';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { userLogindata } from "../../slices/userSlice";


const Sidebar = ({active}) => {
    const auth = getAuth();
    const storage = getStorage();
    let dispatch = useDispatch()
    let navigate = useNavigate()
    const db = getDatabase();

    let data = useSelector((state)=> state.getInitialState.userInfo)
   
    



    const [image, setImage] = useState("");
    const [cropData, setCropData] = useState("#");
    const [cropper, setCropper] = useState();
    const [imgUploadModal, setImgUploadModal] = useState(false);
    let [loading, setLoading] = useState(false);

    
   
    const handleLogout = () =>{
        signOut(auth).then(() => {
            dispatch(userLogindata(null))
            localStorage.removeItem("userEasychat")
            navigate("/login")
        }).catch((error) => {
            console.log(error)
        });
    }

    let handleImgUpload = () =>{
        setImgUploadModal(true)
    }
    let handleCancelimgUp = () => {
        setImgUploadModal(false)
        setImage("")
        setCropData("")
        setCropper("")
    }
    
    const handleChangeUpdate = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
          files = e.dataTransfer.files;
        } else if (e.target) {
          files = e.target.files;
        }

        console.log(files)
        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result );
        };
        reader.readAsDataURL(files[0]);
      };

      const getCropData = () => {
        setLoading(true)
        if (typeof cropper !== "undefined") {
          setCropData(cropper.getCroppedCanvas().toDataURL());

          const storageRef = ref(storage, auth.currentUser.uid );
          const message4 = cropper.getCroppedCanvas().toDataURL();
            uploadString(storageRef, message4, 'data_url').then((snapshot) => {
                console.log('Uploaded a data_url string!');
                getDownloadURL(storageRef).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    updateProfile(auth.currentUser,{
                        photoURL: downloadURL
                    }).then(()=>{
                        setLoading(false)
                        setImgUploadModal(false)
                        setImage("")
                        setCropData("")
                        setCropper("")
                    }).then(()=>{
                        set(storRef(db, 'users/' + auth.currentUser.uid), {
                            email: auth.currentUser.email,
                            username: auth.currentUser.displayName,
                            imgurl: downloadURL ,
                        })
                    })
                });
            });

            }
        
      };

  return (
    <div className='bg-red-500 h-screen rounded-xl pt-10 pl-6 pr-0'>
        <div className="group relative profile m-auto  w-[100px] h-[100px] rounded-full">
            <img className='m-auto w-full h-full rounded-full' src={auth.currentUser.photoURL} alt="profile images" loading="lazy" />
            <h2 className=" font-nunito font-bold  text-md mt-2 text-white text-center ">{data.displayName}</h2>

            <div onClick={handleImgUpload} className="w-[100px] h-[100px] rounded-full bg-[rgba(0,0,0,.5)] opacity-0 group-hover:opacity-100 absolute top-0 left-0 flex justify-center items-center">
                <BsFillCloudUploadFill className="text-white text-2xl" />
            </div>
        </div>
        <div className={`mt-24 pr-5  relative z-[1] after:z-[-1] after:pl-9 after:[content('')] ${active == "home" && "after:bg-white"}  after:w-full after:h-[88px] after:absolute after:top-[-16px] after:left-0 after:rounded-tl-xl after:rounded-bl-xl before:[content[''] before:w-[8px] before:h-[89px] before:bg-primary before:absolute before:top-[-17px] before:right-0 before:rounded-tl-2xl before:rounded-bl-2xl`}>
            <Link to="/"> <AiOutlineHome className={`m-auto text-5xl z-[1]  ${active == "home" ? "text-primary" : "text-white"}` }  /></Link>
           
        </div>
        <div className={`mt-24 pr-5  relative z-[1] after:z-[-1] after:pl-9 after:[content('')] ${active == "msg" && "after:bg-white"}  after:w-full after:h-[88px] after:absolute after:top-[-16px] after:left-0 after:rounded-tl-xl after:rounded-bl-xl before:[content[''] before:w-[8px] before:h-[89px] before:bg-primary before:absolute before:top-[-17px] before:right-0 before:rounded-tl-2xl before:rounded-bl-2xl`}>
            <Link to="/message"><AiFillMessage className={`m-auto text-5xl z-[1]  ${active == "msg" ? "text-primary" : "text-white"}` }  /></Link>
            
        </div>
        <div className={`mt-24 pr-5  relative z-[1] after:z-[-1] after:pl-9 after:[content('')] ${active == "notification" && "after:bg-white"}  after:w-full after:h-[88px] after:absolute after:top-[-16px] after:left-0 after:rounded-tl-xl after:rounded-bl-xl before:[content[''] before:w-[8px] before:h-[89px] before:bg-primary before:absolute before:top-[-17px] before:right-0 before:rounded-tl-2xl before:rounded-bl-2xl`}>
            <Link to="/notification"><IoMdNotificationsOutline className={`m-auto text-5xl z-[1]  ${active == "notification" ? "text-primary" : "text-white"}` }  /></Link>
        </div>
        <div className={`mt-24 pr-5  relative z-[1] after:z-[-1] after:pl-9 after:[content('')] ${active == "settings" && "after:bg-white"}  after:w-full after:h-[88px] after:absolute after:top-[-16px] after:left-0 after:rounded-tl-xl after:rounded-bl-xl before:[content[''] before:w-[8px] before:h-[89px] before:bg-primary before:absolute before:top-[-17px] before:right-0 before:rounded-tl-2xl before:rounded-bl-2xl`}>
            <Link to="/settings"><AiOutlineSetting className={`m-auto text-5xl z-[1]  ${active == "settings" ? "text-primary" : "text-white"}` }  /></Link>
        </div>
        <div onClick={handleLogout} className=" mt-24 pr-5  relative z-[1] after:z-[-1] after:pl-9 after:[content('')] after:bg-none after:w-full after:h-[88px] after:absolute after:top-[-16px] after:left-0 after:rounded-tl-xl after:rounded-bl-xl before:[content[''] before:w-[8px] before:h-[89px] before:bg-primary before:absolute before:top-[-17px] before:right-0 before:rounded-tl-2xl before:rounded-bl-2xl">
            <FiLogOut className='m-auto text-5xl z-[1] text-[#BAD1FF]'  />
        </div>
        {imgUploadModal &&
        <div className="w-full h-screen z-50 bg-primary absolute top-0 left-0 flex justify-center items-center">
            <div className=" bg-white w-2/4 rounded-lg p-5">
                <h2 className=" font-nunito font-bold lg:text-4xl text-2xl text-heading text-center xl:text-left">Upload Your Profile</h2>
                
                <input onChange={handleChangeUpdate} type="file" />

                {image &&
                <div className="flex">
                    <Cropper
                        className="h-[500px] w-[50%]"
                        initialAspectRatio={1}
                        src={image}
                        background={false}
                        responsive={true}
                        onInitialized={(instance) => {
                            setCropper(instance);
                        }}
                        zoomable={true}
                        viewMode={1}
                        minCropBoxHeight={10}
                        minCropBoxWidth={10}
                        preview=".img-preview"
                    />
                    <div className="w-1/2 flex justify-center items-center">
                        {/* <img className='m-auto ' src={cropData} alt="profile images" /> */}
                        <div className="w-72 h-72 rounded-full overflow-hidden border-sky-300 border-2 ">
                            <div className="img-preview w-full h-full rounded-full" />
                        </div>
                    </div>
                </div>
                }
                <div className="btn-sectoin flex">
                    {loading ? 
                    <div className="mt-12">
                        <Vortex 
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="vortex-loading"
                            wrapperStyle={{}}
                            wrapperClass="vortex-wrapper"
                            colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
                        />
                    </div>
                        
                    : 
                        <button onClick={getCropData} className='font-nunito font-semibold bg-primary w-full xl:w-2/12 py-5 text-xl text-white rounded-md mt-14'>Upload </button>
                    }
                    <button onClick={handleCancelimgUp} className='font-nunito font-semibold bg-red-500 w-full xl:w-2/12 py-5 text-xl text-white rounded-md mt-14 ml-8'>Cancel</button>
                </div>
            </div>
        </div>
        }
    </div>
  )
}

export default Sidebar
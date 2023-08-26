import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

import React, { useState } from 'react';
import { AiFillEyeInvisible, AiFillGithub, AiOutlineEye } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { Vortex } from 'react-loader-spinner';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';


const Registration = () => {
    let auth = getAuth()
    let navigate =  useNavigate()
    const db = getDatabase();

    let [email, setEmail] = useState("");
    let [fullname, setFullname] = useState("");
    let [password, setPassword] = useState("");

    let [emailerr, setEmailerr] = useState("");
    let [fullnameerr, setFullnameerr] = useState("");
    let [passworderr, setPassworderr] = useState("");
    let [passwordShow, setPasswordShow] = useState(false);
    let [loading, setLoading] = useState(false);
    


    let handleEmail = (e) =>{
        setEmail(e.target.value)
        setEmailerr("")
    }
    let handleFullname = (e) =>{
        setFullname(e.target.value)
        setFullnameerr("")
    }
    let handlePassword = (e) =>{
        setPassword(e.target.value)
        setPassworderr("")
    }

    const handleSubmitFun =()=>{
        if(!email){
            setEmailerr('Email is required !')
        }else{

          if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            setEmailerr('Invalid Email !')
          }
        }
        if(!fullname){
            setFullnameerr('FullName is required !')
        }
        if(!password){
            setPassworderr('Password is required !')
        }
       /*  else {
            if(!/^(?=.*[a-z])/.test(password)){
                setPassworderr(' lowercase alphabetical character required !')
            }else if(!/^(?=.*[A-Z])/.test(password)){
                setPassworderr(' uppercase alphabetical character required !')
            }else if(!/^(?=.*[0-9])/.test(password)){
                setPassworderr(' must be numeric character')
            }else if(!/^(?=.*[!@#$%^&*])/.test(password)){
                setPassworderr(' special character required !')
            }else if(!/^(?=.{8,})/.test(password)){
                setPassworderr('password must be eight characters or longer')
            }
        } */
        if(email && fullname && password && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            setLoading(true)
            createUserWithEmailAndPassword(auth, email, password).then((users)=>{
                console.log(users)
                updateProfile(auth.currentUser,{
                    displayName: fullname,
                    photoURL: 'images/profile-img.png'
                }).then(()=>{
                    toast.success("registration Successfull . Please check varifation email !")
                    setEmail("")
                    setFullname("") 
                    setPassword("")
                    sendEmailVerification(auth.currentUser)
                    setLoading(false)
                    setTimeout(()=>{
                        navigate("/login")
                    },2000)
                }).then(()=>{
                    console.log(users)
                    set(ref(db, 'users/' + users.user.uid), {
                        username: users.user.displayName,
                        email: users.user.email,
                        imgurl: users.user.photoURL ,
                    })
                })
                
            }).catch((err)=>{
                const eorrCode = err.code;
                if(eorrCode.includes('auth/email-already-in-use')){
                    setEmailerr("Your Eamil already in use !")
                    setLoading(false)
                }
            })
        }
    }

    const handlePassShow = () =>{
        setPasswordShow(!passwordShow)
    }
    const handlePassOff = () =>{
        setPasswordShow(!passwordShow)
    }
  return (
    <div className='lg:flex '>
        <div className="lg:w-2/4 bg-backgroundleft bg-no-repeat bg-cover xl:h-screen  hidden lg:block">
            <div className="flex flex-col justify-center items-center">
                <div className="logo xl:mt-24 mt-8 flex items-center">
                    <img className="text-center" src="images/logo.png" alt="logo" />
                    <h2 className="inline font-nunito text-white font-bold text-3xl ml-3">Easy Chating app</h2>
                </div>
                <div className="middle mt-20">
                    <img src="images/app.png" alt="app" />
                </div>
                <div className="footer xl:w-1/2  mt-12 ">
                    <h2 className="text-white font-open font-semibold text-3xl text-center xl:text-left px-5 xl:p-0">A chat application, also known as a messaging app.</h2>
                    <p className="font-base mt-2 text-secondary xl:block hidden ">a software application designed to facilitate real-time communication between two or more users over the internet. Chat applications typically allow users to exchange text messages, as well as multimedia files such as photos, videos, and audio messages.</p>
                </div>
            </div>
        </div>
        <div className="lg:w-2/4 lg:flex lg:justify-center">
            <ToastContainer position="top-center" theme="dark" />
            <div className=" mt-1 p-4 lg:p-8 xl:mt-32 xl:p-0">
                <h2 className=" font-nunito font-bold lg:text-4xl text-2xl text-heading text-center xl:text-left">Get started with easily register</h2>
                <span className='text-borderline lg:text-xl  text-dm text-center xl:text-left block'>Free register and you can enjoy it</span>
                <div className="social-l text-center xl:text-left">
                    <button  className='border border-[#EEEEEE] lg:mt-8 mt-5 py-3 text-[#616161] text-sm px-6 rounded-full'><FcGoogle className="inline-block mr-2 text-xl" />Sign up with Google</button>
                    <button  className='border border-[#EEEEEE] lg:mt-8 mt-4 py-3 text-[#616161] text-sm px-6 rounded-full md:ml-4'><AiFillGithub className="inline-block mr-2 text-xl" />Sign up with Google</button>
                </div>
                <div className="form">
                    <div className="form-group xl:w-4/5 lg:mt-12 mt-8 relative">
                        <input value={fullname} onChange={handleFullname} className='border-b-2 outline-0  lg:py-5 py-3 w-full border-solid border-borderline text-xl font-nunito font-semibold text-heading' type="text" />
                        <p className='absolute top-[-10px] left-[0] font-nunito font-semibold text-sm text-[#757575] bg-white  tracking-wide'>Full name</p>
                        {fullnameerr && <p className='bg-red-400 p-1 rounded-sm font-semibold text-white mt-1'>{fullnameerr}</p>}
                    </div>
                    <div className="form-group xl:w-4/5 lg:mt-12 mt-8 relative">
                        <input value={email} onChange={handleEmail} className='border-b-2 outline-0  lg:py-5 py-3 w-full border-solid border-borderline text-xl font-nunito font-semibold text-heading' type="email" />
                        <p className='absolute top-[-10px] left-[0] font-nunito font-semibold text-sm text-[#757575] bg-white  tracking-wide'>Email Address</p>

                        {emailerr && <p className='bg-red-400 p-1 rounded-sm font-semibold text-white mt-1'>{emailerr}</p>}   
                    </div>
                    <div className="form-group xl:w-4/5 lg:mt-12 mt-8 relative">
                        <input value={password} onChange={handlePassword} className='border-b-2 outline-0  lg:py-5 py-3 w-full border-solid border-borderline text-xl font-nunito font-semibold text-heading' type={passwordShow ? "text" : "password"} />
                        <p className='absolute top-[-10px] left-[0] font-nunito font-semibold text-sm text-[#757575] bg-white  tracking-wide'>Password</p>

                        {passwordShow ? (
                            <AiOutlineEye onClick={handlePassShow} className='absolute lg:top-[31px] top-[20px]  right-5 text-xl '/>
                        ):(
                            <AiFillEyeInvisible onClick={handlePassOff}  className='absolute  lg:top-[31px] top-[20px]  right-5 text-xl' />
                        )}
                        
                     
                        {passworderr && <p className='bg-red-400 p-1 rounded-sm font-semibold text-white mt-1'>{passworderr}</p>}
                    </div>
                </div>
                
                
                {loading ? 
                    <div className="flex justify-center xl:w-4/5 mt-10">
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
                <button onClick={handleSubmitFun} className='font-nunito font-semibold bg-primary xl:w-4/5 w-full py-5 text-xl text-white rounded-full mt-10'>Sign up</button>
                
                }

                <p className='font-open font-normal text-sm xl:w-4/5 text-center mt-6'>Already  have an account ? <Link to="/login" className='text-[#EA6C00]  font-bold capitalize '>Sign In</Link></p>
            </div>
            <div className="mas absolute bottom-0 right-10 hidden xl:block">
                <img  src="images/CHAT.png" alt="chat" />
            </div>
        </div>
        
    </div>
  )
}

export default Registration
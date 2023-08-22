import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import React, { useState } from 'react';
import { AiFillEyeInvisible, AiFillGithub, AiOutlineEye } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { Vortex } from 'react-loader-spinner';
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { userLogindata } from "../../slices/userSlice";






const Login = () => {
    let auth = getAuth()
    let navigate = useNavigate()
    let dispatch = useDispatch()
    const provider = new GoogleAuthProvider();
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [emailerr, setEmailerr] = useState("");
    let [passworderr, setPassworderr] = useState("");
    let [passwordShow, setPasswordShow] = useState(false);
    let [loading, setLoading] = useState(false);
    
    


    let handleEmail = (e) =>{
        setEmail(e.target.value)
        setEmailerr("")
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
        if(email  && password && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            setLoading(true)
            signInWithEmailAndPassword(auth, email, password).then((loginUser)=>{
                setLoading(false)
                const user = loginUser.user
                toast.success("login Successfull !")
                dispatch(userLogindata(user))
                localStorage.setItem("userEasychat",JSON.stringify(user))
                setTimeout(()=>{
                    navigate("/")
                },2000)
            }).catch((err)=>{
                const errorCode = err.code
                if(errorCode.includes("auth/user-not-found")){
                    setEmailerr("email not found")
                    setLoading(false)
                }
                if(errorCode.includes("auth/wrong-password")){
                    setPassworderr("Your password wrong !")
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

    // google login functionality 
    const handleGoogleLogin = () =>{
        signInWithPopup(auth, provider).then((result)=>{
            console.log(result)
            setTimeout(()=>{
                navigate("/")
            },3000)
        })
    }
  return (
    <div className='lg:flex'>
    <ToastContainer position="top-center" theme="dark" />
    <div className="lg:w-2/4  lg:flex lg:justify-end">
        <div className=" mt-1 p-4 xl:mt-52">
            <h2 className=" xl:w-2/3 font-nunito text-center font-bold xl:text-4xl text-2xl text-heading">Welcome back to the Easy Chat Community</h2>
           
            <div className="social-l text-center xl:text-left">
                    <button onClick={handleGoogleLogin}  className='border border-[#EEEEEE] lg:mt-8 mt-5 py-3 text-[#616161] text-sm px-6 rounded-full'><FcGoogle className="inline-block mr-2 text-xl" />Sign up with Google</button>
                    <button  className='border border-[#EEEEEE] lg:mt-8 mt-4 py-3 text-[#616161] text-sm px-6 rounded-full md:ml-4'><AiFillGithub className="inline-block mr-2 text-xl" />Sign up with Google</button>
                </div>
            <div className="form">
                <div className="form-group xl:w-4/5 lg:mt-12 mt-8 relative">
                    <input value={email} onChange={handleEmail} className='border-b-2 outline-0  py-5 w-full border-solid border-borderline text-xl font-nunito font-semibold text-heading' type="email" />
                    <p className='absolute top-[-10px] left-[0] font-nunito font-semibold text-sm text-[#757575] bg-white  tracking-wide'>Email Address</p>

                    {emailerr && <p className='bg-red-400 p-1 rounded-sm font-semibold text-white mt-1'>{emailerr}</p>}
                    
                </div>
                
                <div className="form-group xl:w-4/5 lg:mt-12 mt-8 relative">
                    <input value={password} onChange={handlePassword} className='border-b-2 outline-0  py-5 w-full border-solid border-borderline text-xl font-nunito font-semibold text-heading' type={passwordShow ? "text" : "password"} />
                    <p className='absolute top-[-10px] left-[0] font-nunito font-semibold text-sm text-[#757575] bg-white  tracking-wide'>Password</p>

                    {passwordShow ? (
                        <AiOutlineEye onClick={handlePassShow} className='absolute top-[31px]  right-5 text-xl '/>
                    ):(
                        <AiFillEyeInvisible onClick={handlePassOff}  className='absolute top-[31px]  right-5 text-xl' />
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
            
            <button onClick={handleSubmitFun} className='font-nunito font-semibold bg-primary w-full xl:w-4/5 py-5 text-xl text-white rounded-md mt-14'>Login to Continue</button>
            
            }
            <Link to="/forgotpassword" className='text-[#EA6C00]  font-bold capitalize text-lg underline block text-center xl:w-4/5 mt-10'>ForgotPassword</Link>
            <p className='font-open font-normal text-sm xl:w-4/5 text-center mt-6'>Don’t have an account ?  <Link to="/registration" className='text-[#EA6C00]  font-bold capitalize '>Sign up</Link></p>
        </div>
    </div>
    <div className="lg:w-2/4 bg-backgroundright bg-no-repeat bg-cover xl:h-screen hidden lg:block">
        <div className="flex flex-col justify-center items-center">
            <div className="logo mt-24 flex items-center">
                <img className="text-center" src="images/logo.png" alt="logo" />
                <h2 className="inline font-nunito text-white font-bold text-3xl ml-3">Easy Chating app</h2>
            </div>
            <div className="middle mt-20">
                <img src="images/app.png" alt="app" />
            </div>
            <div className="footer xl:w-1/2  mt-12 ">
                <h2 className="text-white font-open font-semibold text-3xl p-6 pt-0 xl:p-0 text-center ">A chat application, also known as a messaging app.</h2>
                <p className="font-base mt-2 text-secondary hidden xl:block">a software application designed to facilitate real-time communication between two or more users over the internet. Chat applications typically allow users to exchange text messages, as well as multimedia files such as photos, videos, and audio messages.</p>
            </div>
        </div>
        <div className="mas absolute bottom-0 left-10  hidden xl:block">
            <img className="scale-x-[-1]" src="images/CHAT.png" alt="chat" />
        </div>
    </div>
</div>
  )
}

export default Login
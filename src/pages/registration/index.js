import React, { useState } from 'react';
import { AiFillEyeInvisible, AiOutlineEye } from 'react-icons/ai';

const Registration = () => {
    let [email, setEmail] = useState("");
    let [fullname, setFullname] = useState("");
    let [password, setPassword] = useState("");

    let [emailerr, setEmailerr] = useState("");
    let [fullnameerr, setFullnameerr] = useState("");
    let [passworderr, setPassworderr] = useState("");
    let [passwordShow, setPasswordShow] = useState(false);
    


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
        }else {
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
        }
    }

   
    const handlePassShow = () =>{
        setPasswordShow(!passwordShow)
    }
    const handlePassOff = () =>{
        setPasswordShow(!passwordShow)
    }
  return (
    <div className='flex'>
        <div className="w-2/4 flex justify-end">
            <div className=" mr-16 mt-52">
                <h2 className=" font-nunito font-bold text-4xl text-heading">Get started with easily register</h2>
                <span className='text-borderline text-xl'>Free register and you can enjoy it</span>
                <div className="form">
                    <div className="form-group w-96 mt-12 relative">
                        <input onChange={handleEmail} className='border-2 rounded-md p-6 w-full border-solid border-borderline text-xl font-nunito font-semibold text-heading' type="email" />
                        <p className='absolute top-[-10px] left-[52px] font-nunito font-semibold text-sm text-heading bg-white px-4 tracking-wide'>Email Address</p>

                        {emailerr && <p className='bg-red-400 p-1 rounded-sm font-semibold text-white mt-1'>{emailerr}</p>}
                        
                    </div>
                    <div className="form-group w-96 mt-12 relative">
                        <input onChange={handleFullname} className='border-2 rounded-md p-6 w-full border-solid border-borderline text-xl font-nunito font-semibold text-heading' type="text" />
                        <p className='absolute top-[-10px] left-[52px] font-nunito font-semibold text-sm text-heading bg-white px-4 tracking-wide'>Full name</p>
                        {fullnameerr && <p className='bg-red-400 p-1 rounded-sm font-semibold text-white mt-1'>{fullnameerr}</p>}
                    </div>
                    <div className="form-group w-96 mt-12 relative">
                        <input onChange={handlePassword} className='border-2 rounded-md p-6 w-full border-solid border-borderline text-xl font-nunito font-semibold text-heading' type={passwordShow ? "text" : "password"} />
                        <p className='absolute top-[-10px] left-[52px] font-nunito font-semibold text-sm text-heading bg-white px-4 tracking-wide'>Password</p>

                        {passwordShow ? (
                            <AiOutlineEye onClick={handlePassShow} className='absolute top-[31px]  right-5 text-xl '/>
                        ):(
                            <AiFillEyeInvisible onClick={handlePassOff}  className='absolute top-[31px]  right-5 text-xl' />
                        )}
                        
                     
                        {passworderr && <p className='bg-red-400 p-1 rounded-sm font-semibold text-white mt-1'>{passworderr}</p>}
                    </div>
                </div>
                
                <button onClick={handleSubmitFun} className='font-nunito font-semibold bg-primary w-96 py-5 text-xl text-white rounded-full mt-10'>Sign up</button>
                <p className='font-open font-normal text-sm w-96 text-center mt-6'>Already  have an account ? <span className='text-[#EA6C00]  font-bold capitalize '>Sign In</span></p>
            </div>
        </div>
        <div className="w-2/4">
            <div>
                <img className="w-full h-screen object-cover" src="images/right-pic.png" alt="reg-images" />
            </div>
        </div>
    </div>
  )
}

export default Registration
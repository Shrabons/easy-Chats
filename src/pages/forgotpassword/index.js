import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


const Forgotpassword = () => {
    const auth = getAuth();
    let [email, setEmail] = useState("");
    let [emailerr, setEmailerr] = useState("");

    let handleEmail = (e)=>{
        setEmail(e.target.value)
        setEmailerr("")
    }

    const handleForgotPass = () =>{
        if(!email){
            setEmailerr("Email is required !")
        }

        sendPasswordResetEmail(auth, email)
        .then((useremail) => {
            console.log(useremail)
            toast.success(" Proccess Successfull. Please Chcek Your Email !")
        })
        .catch((error) => {
            const errorCode = error.code;
            if(errorCode.includes("auth/user-not-found")){
                setEmailerr("Uers not found !")
            }
        });

    }
  return (
    <div className="flex justify-center items-center h-screen  bg-backgroundright bg-no-repeat bg-cover">
        <ToastContainer position="top-center" theme="dark" />
        <div className='xl:w-1/4 bg-white p-8 rounded-lg'>
            <h2 className=" font-nunito text-center font-bold  text-3xl text-heading">Forgot Password</h2>
            <div className="form-group  mt-12 relative"> 
                <input value={email} onChange={handleEmail} className='border-b-2 outline-0  py-5 w-full border-solid border-borderline text-xl font-nunito font-semibold text-heading' type="email" />
                <p className='absolute top-[-10px] left-[0] font-nunito font-semibold text-sm text-[#757575] bg-white  tracking-wide'>Email Address</p>
                {emailerr && <p className='bg-red-400 p-1 rounded-sm font-semibold text-white mt-2'>{emailerr}</p>}
            </div>
            <div className="btn mt-12">
                <button onClick={handleForgotPass} className='bg-primary py-3 px-11 font-nunito font-semibold text-white w-full md:w-auto text-lg rounded-md block md:inline'>Update</button>
                <Link to="/login" className='bg-primary py-3 px-11 font-nunito font-semibold text-white text-lg rounded-md md:ml-4 block md:inline w-full mt-4 text-center'>back to login</Link>
            </div>
        </div>
    </div>
  )
}

export default Forgotpassword
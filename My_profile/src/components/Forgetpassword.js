import Axios from 'axios'
import React, { useState } from 'react'
import { Link,  useNavigate } from 'react-router-dom'
import swal from 'sweetalert'

export default function Forgetpassword() {
    const navigate = useNavigate();
    const [ email , setEmail ] = useState('')
    const [ user_name , setUsername ] = useState('')
    const [ onetp , setOnetp ] = useState('')
    const [ Otp , setOtp ] = useState('')
    const [ newpassword , setNewpassword ] = useState('')
    const [ h1 ,setH1 ] = useState('hidden')
    const [ h2 ,setH2 ] = useState('hidden')

    const otp = async () =>{
        const data = await Axios.post("http://localhost:3001/forget_password", {user_name : user_name , email : email})
        .then((res)=>{
            //alert(res.data.otp)
            if(res.data.success === true)
            {
                setOtp(res.data.otp)
                setH1('block')
                swal({
                    title: "Done",
                    text: "OTP send to your email . Enter otp and change password",
                    icon: "success"
                })
            }
            else
            {   
                swal({
                    title: "Opps !",
                    text: res.data.emessage,
                    icon: "warning"
                })
            }
        })
    }
    const checkOtp = async () =>{
        if(onetp == Otp)
        {
            setH2('block')
        }
        else
        {
            swal({
                title: "Opps !",
                text: "OTP not matched",
                icon: "warning"
            })
        }
    }

    const Change = async () =>{
        const data = await Axios.post("http://localhost:3001/change_password", {user_name : user_name , password : newpassword})
        .then((res)=>{
            //alert(res.data.otp)
            if(res.data.success === true)
            {
                swal({
                    title: "Done",
                    text: "Password changed",
                    icon: "success"
                })
                navigate('/')
            }
            else
            {   
                swal({
                    title: "Opps !",
                    text: "something went wrong",
                    icon: "warning"
                })
            }
        })
    }

    return (
        <div className="bg-gray-100 h-screen mx-auto overflow-hidden font-mono font-semibold" >
                <div className=" w-screen h-screen mx-auto flex" >
                    <div className="w-1/2 pl-72">
                        <p className="mt-32 p-2 text-7xl my-2 bg-cyan-500 rounded-xl text-left font-mono text-white">My Profile</p>
                        <p className="text-xl p-2 text-left rounded-xl font-mono bg-white text-cyan-500">grab opportunites now !</p>
                    </div>
                    <div className="w-1/2 overflow-y-scroll ">
                        <div  className="px-3 w-4/6 m-auto mt-32 rounded-xl bg-white" >
                            <h1 className="text-3xl py-5 text-center">Forgetpassword</h1>
                            <h2 className="mb-2 text-black text-base">Enter your user_name .</h2>
                            <input type="text" autoComplete='off' value={user_name} onChange={e=>{setUsername(e.target.value)}} placeholder="user_name" className=" px-3 py-3 mb-3 border border-cyan-200 focus:outline-blue-700 rounded w-full mr-4 placeholder:text-gray-400 drop-shadow-lg" id='x' />
                            <h2 className='mb-2 text-black text-base'>Enter email</h2>
                            <input type="email" autoComplete='off' value={email} onChange={e=>{setEmail(e.target.value)}} placeholder="email" className=" px-3 py-3 mb-3 border border-cyan-200 focus:outline-blue-700 rounded w-full mr-4 placeholder:text-gray-400 drop-shadow-lg" />
                            <button className='rounded cursor-pointer px-10 py-3 mb-3 border-4 border-white hover:border-cyan-700 bg-cyan-500 hover:bg-cyan-700 text-white mt-3' onClick={otp} >Genrate otp</button><br />
                            <div className={`${h1}`}>
                            <h2 className="mb-2 text-black text-base">Enter OTP .</h2>
                            <input type="number" autoComplete='off' value={onetp} onChange={e=>{setOnetp(e.target.value)}} placeholder="Otp" className=" px-3 py-3 mb-3 border border-cyan-200 focus:outline-blue-700 rounded w-full mr-4 placeholder:text-gray-400 drop-shadow-lg" id='x' />
                            <button className="rounded  cursor-pointer px-10 py-3 mb-3 border-4 border-white hover:border-cyan-700 bg-cyan-500 hover:bg-cyan-700 text-white mt-3" onClick={checkOtp} >Done</button>
                            </div>
                            <div className={`${h2}`}>
                            <h2 className="mb-2 text-black text-base">Enter new password .</h2>
                            <input type="password" autoComplete='off' value={newpassword} onChange={e=>{setNewpassword(e.target.value)}} placeholder="new password" className=" px-3 py-3 mb-3 border border-cyan-200 focus:outline-blue-700 rounded w-full mr-4 placeholder:text-gray-400 drop-shadow-lg" id='x' />
                            <button className="rounded  cursor-pointer px-10 py-3 mb-3 border-4 border-white hover:border-cyan-700 bg-cyan-500 hover:bg-cyan-700 text-white mt-3" onClick={Change} >Change Password</button>
                            </div>
                            <Link to="/" ><button  className="rounded cursor-pointer px-10 py-3 mb-3 border-4 border-white float-right hover:border-cyan-700  bg-cyan-500 hover:bg-cyan-700 text-white mt-3">Back</button></Link>
                        </div>
                    </div>
                </div>
            </div>
    )
}

import React, { useState } from 'react';
import { Link, navigate } from 'react-router-dom';
import Axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
// import img2 from '../images/regper1.png';
// import img1 from '../images/reg.png';
// import img3 from '../images/job.png';

export default function Registrations() {

    const [userData, setData] = useState({ fullname: '', email: '', password: '', mobile_no: '', confirmpassword: '' })
    const navigate = useNavigate();

    const authentication = () => {
        if (userData.password === userData.confirmpassword) {
            Axios.post("http://localhost:3001/user_authorization/create", { user_name: userData.fullname, email: userData.email, password: userData.password }).then(function (response) {
                if (response.data.success === true) {
                    swal({
                        title: "Done",
                        text: response.data.message,
                        icon: "success"
                    })
                    navigate('/regpersonalinfo', { state: { "user_id": response.data.user._id, "user_name": response.data.user.user_name } })
                }
                else {
                    swal({
                        title: "opps !",
                        text: response.data.errors,
                        icon: "warning",
                    });
                }
            });
        }
        else {
            swal({
                title: "opps !",
                text: "please enter correct password",
                icon: "warning",
            });
        }
    }

    return (
        <div className="bg-gray-100 h-screen mx-auto overflow-hidden font-semibold" >
            <div className=" w-screen h-screen mx-auto flex" >
                <div className="w-1/2 pl-72">
                    <p className="mt-32 p-2 text-7xl my-2 bg-cyan-500 rounded-xl text-left font-mono text-white">My Profile</p>
                    <p className="text-xl p-2 text-left rounded-xl font-mono bg-white text-cyan-500">Make your profile grab opportunites !</p>
                </div>
                <div className="py-10  w-1/2 mx-auto" >
                    <div className="w-2/3 mx-auto rounded-xl bg-white px-3">

                        <h1 className="text-3xl py-5 text-center">Registration</h1>
                        <h2 className="text-2xl text-center" >Sign up</h2><br />
                        <h2 className="mb-2  text-black text-base">Enter Your name .</h2>
                        <input type="text" value={userData.fullname} onChange={e => setData({ ...userData, fullname: e.target.value })} placeholder="First_name middle_name surname" className=" px-3 py-3 mb-3 border border-cyan-200 focus:outline-blue-700 rounded w-full mr-4 placeholder:text-gray-400 drop-shadow-lg" />
                        <h2 className="mb-2  text-black text-base">Enter your e-mail address .</h2>
                        <input type="text" value={userData.email} onChange={e => setData({ ...userData, email: e.target.value })} placeholder="E-mail" className=" px-3 py-3 mb-3 border border-cyan-200 focus:outline-blue-700 rounded w-full mr-4 placeholder:text-gray-400 drop-shadow-lg" />
                        <h2 className="mb-2 text-black text-base">Create your password .</h2>
                        <input type="password" value={userData.password} onChange={e => setData({ ...userData, password: e.target.value })} placeholder="password" className=" px-3 py-3 mb-3 border border-cyan-200 focus:outline-blue-700 rounded w-full mr-4 placeholder:text-gray-400 drop-shadow-lg" />
                        <h2 className="mb-2 text-black text-base">Enter Confirm password .</h2>
                        <input type="password" value={userData.confirmpassword} onChange={e => setData({ ...userData, confirmpassword: e.target.value })} placeholder="confirm password" className=" px-3 py-3 mb-3 border border-cyan-200 focus:outline-blue-700 rounded w-full mr-4 placeholder:text-gray-400 drop-shadow-lg" />
                        <button className="rounded  cursor-pointer px-10 py-3 mb-3 border-4 border-white hover:border-cyan-700 bg-cyan-500 hover:bg-cyan-700 text-white mt-3" onClick={authentication} >Create account</button>
                        <Link to="/" ><input type="button" className="rounded  cursor-pointer px-10 py-3 mb-3 float-right border-4 border-white hover:border-cyan-700 bg-cyan-500 hover:bg-cyan-700 text-white mt-3" value="I have an account" /></Link>
                        {/* <button className="rounded px-10 py-2 mb-3 out bg-blue-300 hover:bg-blue-600 text-white border-4 border-transparent hover:border-blue-900 mt-3"  >Next</button> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
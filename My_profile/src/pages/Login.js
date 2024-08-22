import React, { useContext, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { login } from '../API';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
    const navigate = useNavigate();
    const email = useRef();
    const password = useRef();
    const { user, dispatch } = useContext(AuthContext)
    const check = (e) => {
        e.preventDefault();
        //document.getElementById('x').focus()
        login({ email: email.current.value, password: password.current.value }, dispatch);
    };

    useEffect(() => {
        if (user != null) {
            navigate('/home')
        }
        else {
            navigate('/')
        }
    }, [user, navigate])

    return (
        <>
            <div className="bg-gray-100 h-screen mx-auto overflow-hidden font-mono font-semibold" >
                <div className=" w-screen h-screen mx-auto flex" >
                    <div className="w-1/2 pl-72">
                        <p className="mt-32 p-2 text-7xl my-2 bg-cyan-500 rounded-xl text-left font-mono text-white">My Profile</p>
                        <p className="text-xl p-2 text-left rounded-xl font-mono bg-white text-cyan-500">grab opportunites now !</p>
                    </div>
                    <div className="w-1/2 ">
                        <form onSubmit={check} className="px-3 w-4/6 m-auto mt-32 rounded-xl bg-white" >
                            <h1 className="text-3xl py-5 text-center">Login</h1>
                            <h2 className="mb-2 text-black text-base">Enter your e-mail address .</h2>
                            <input type="email" autoComplete='off' ref={email} placeholder="E-mail" className=" px-3 py-3 mb-3 border border-cyan-200 focus:outline-blue-700 rounded w-full mr-4 placeholder:text-gray-400 drop-shadow-lg" id='x' />
                            <h2 className="mb-2 text-black text-base" >Enter your password .</h2>
                            <input type="password" ref={password} placeholder="password" className=" px-3 py-3 mb-3 border border-cyan-200 focus:outline-blue-700 rounded w-full mr-4 placeholder:text-gray-400 drop-shadow-lg" />
                            <Link to="/fpassword" ><h2 className="mb-2 text-black text-base underline" >Forgot password ?</h2></Link>
                            <input type="submit" value="Log-in" className="rounded  cursor-pointer px-10 py-3 mb-3 border-4 border-white hover:border-cyan-700 bg-cyan-500 hover:bg-cyan-700 text-white mt-3" />
                            <Link to="/registration" ><input type="button" value="Sign-up" className="rounded cursor-pointer px-10 py-3 mb-3 border-4 border-white float-right hover:border-cyan-700  bg-cyan-500 hover:bg-cyan-700 text-white mt-3" /></Link>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}
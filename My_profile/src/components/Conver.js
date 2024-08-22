import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Axios from 'axios';

export default function Conver(props) {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext)
    const [ userProfile , setUserprofile] = useState('')

    const getProfile =async(user_id)=>{
        try {
            const data = await Axios.get("http://localhost:3001/getprofilepic/" + user_id)
            setUserprofile([data.data])
        } catch (error) {
            
        }
    }
    
    useEffect(() => {
        if (user != null) {
            getProfile(props.conversation)
        }
        else {
            navigate('/')
        }
    }, [user, navigate])
    return (
        <div>
            {
                userProfile && 
                userProfile.map((x)=>{
                    const image64 = btoa(String.fromCharCode(...new Uint8Array(x.profilepic.data.data)))
                    return(<div className="flex border-b-2 border-gray-500 p-2 m-2 items-center">
                        <div className=""><img src={`data:image/png;base64,${image64}`} alt="b" className="w-16 rounded-full" /></div>
                        <div className="h-full my-auto mx-3  cursor-pointer">{x.user_name}</div>
                    </div>)
                })
            }
        </div>
    )
}

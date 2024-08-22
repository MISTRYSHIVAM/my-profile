import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Axios from 'axios';
import ReactTimeAgo from 'react-time-ago'

export default function Notification() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext)
    const [noti, setNoti] = useState()

    const getNoti = async () => {
        const data = await Axios.get("http://localhost:3001/get_user_noti/" + user._id)
        if (data.data !== "no") {
            setNoti(data.data)
        }
        else {
            setNoti(null)
        }
    }
    useEffect(() => {
        if (user) {
            getNoti()
        }
        else {
            navigate('/')
        }
    }, [user, navigate])
    return (
        <div className="w-6/12 my-4 mx-auto shadow-md rounded-xl border-2 border-gray-500 shadow-gray-500 bg-white ">
            <div className="border-b-2 border-gray-700 m-3">
                {
                    noti
                        ?
                        noti.map((n) => {
                            return (
                                <div className="flex border-b border-b-gray-700">
                                    <div className="w-1/2 border-r-2 border-r-700" >{n.from + " " + n.notification }</div>
                                    <div className="w-1/2" ><ReactTimeAgo date={n.createdAt}  /></div>
                                </div>
                            )
                        })
                        :
                        "no notification"
                }
            </div>
        </div>
    )
}
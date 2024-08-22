import React, { useContext, useEffect, useState } from 'react'
import Axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';

export default function Adminnoti() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext)
    const [pageInfo, setPageinfo] = useState();
    const noty = async () => {
        const data = await Axios.get("http://localhost:3001/page_info/" + user._id)
        setPageinfo([data.data])
    }
    const userprofile = (id,name) =>{
        navigate('/userprofile' , {state : {user_id : id ,user_name : name,from : "admin"  }})
    }

    useEffect(() => {
        if (user != null) {
            noty()
        }
        else {
            navigate('/')
        }
    }, [user, navigate])
    return (
        <div className="w-full h-screen overflow-y-scroll">
            {
                pageInfo &&
                pageInfo.map((x) => {
                    return x.map((data) => {
                        return (<div className="border-b-2 p-3 border-blue-700 flex">
                            <div className="w-4/6" ><span className="cursor-pointer" onClick={e => userprofile(data.user_id,data.user_name)}>{data.user_name}</span> follow your page </div><div className="w-2/6"><ReactTimeAgo date={data.date} locale="en-US" /></div>
                        </div>)
                    })

                })
            }
        </div>
    )
}

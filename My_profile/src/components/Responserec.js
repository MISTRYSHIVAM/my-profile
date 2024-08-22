import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Axios from 'axios';
import ReactTimeAgo from 'react-time-ago'

export default function Responserec(props) {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext)
    const [resOfrecrutment, setRes] = useState('')

    const go = async () => {
        const data = await Axios.get('http://localhost:3001/recrutmentinfo/' + props.page_id)
        if (data) {
            setRes(data.data)
        }

    }

    useEffect(() => {
        if (user != null) {
            go()
        }
        else {
            navigate('/')
        }
    }, [user, navigate])

    const userprofile = (id,name) =>{
        navigate('/userprofile' , {state : {user_id : id ,user_name : name ,from : "admin"  }})
    }
    return (
        <div>
            {
                resOfrecrutment &&
                resOfrecrutment.response.map((x) => {
                    return(<div className="flex">
                        from : <div className="cursor-pointer underline" onClick={e => userprofile(x.user_id,x.user_name)} > { " "+x.user_name+" "} </div> <div className="ml-2">responsed </div> <div className="ml-2"><ReactTimeAgo date={x.date} locale="en-US" /></div>
                    </div>)
                })
            }
        </div>
    )
}

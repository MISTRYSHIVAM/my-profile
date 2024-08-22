import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function Admindata(props) {
    const navigate = useNavigate();
    const [ adminprofile , setAdminprofile ] = useState()
    const profile = async () =>{
        const data = await Axios.get("http://localhost:3001/getprofilepic/"+props.id)
        if(data)
        {
            setAdminprofile([data.data])
            // console.log(data.data)
        }
    }
    const see = (id,name) =>{
        navigate('/userprofile' , {state : {user_id : id ,user_name : name,from : "admin"  }})
    }
    useEffect(()=>{
        profile()
    },[])
    return (
        <div>
            {
            adminprofile &&
            adminprofile.map((d)=>{
                const p = btoa(String.fromCharCode(...new Uint8Array(d.profilepic.data.data)))
                return (<div className="w-44" >
                <div><img src={`data:image/png;base64,${p}`} className="rounded-full shadow-xl mb-2" alt="user" /></div>
                <div  className="cursor-pointer"  onClick={e => see(d.user_id , d.user_name)}>{d.user_name}</div>
                </div>)
            })
            }
        </div>
    )
}

import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Axios from 'axios';
import ReactTimeAgo from 'react-time-ago'

export default function Chats(props) {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext)
    const [tp, setTp] = useState()
    const [up, setUsp] = useState()

    const getProfile = async () => {
        try {
            const data = await Axios.get("http://localhost:3001/getprofilepic/" + user._id)
            setUsp([data.data])
            //console.log(data.data)
        } catch (error) {

        }
    }

    useEffect(() => {
        if (user != null) {
            setTp(props.toimg)
            getProfile()
        }
        else {
            navigate('/')
        }
    }, [user, navigate])
    return (
        <div className="p-2 ">
            {
                (props.msg.sender === user._id)
                    ?
                    <div className="flex">
                        <div className="w-1/2"></div>
                        <div className="w-1/2 p-1 ">
                            {
                                up &&
                                up.map((d) => {
                                    const image64 = btoa(String.fromCharCode(...new Uint8Array(d.profilepic.data.data)))
                                    return (<><div className="flex">
                                        <div><img src={`data:image/png;base64,${image64}`} alt="b" className="w-12 rounded-full" /></div>
                                        <div className="w-full ml-3 h-full my-auto p-2 rounded-lg bg-blue-300">{props.msg.message}</div><br />
                                    </div>
                                        <div className="float-right mt-1 right-0"><ReactTimeAgo date={props.msg.createdAt} locale="en-US" /></div>
                                    </>)
                                })
                            }
                        </div>
                    </div>
                    :
                    <div className="flex">
                        <div className="w-1/2 p-1">
                            {
                                tp &&
                                tp.map((d) => {
                                    const image64 = btoa(String.fromCharCode(...new Uint8Array(d.profilepic.data.data)))
                                    return (<>
                                        <div className="flex">
                                            <div><img src={`data:image/png;base64,${image64}`} alt="b" className="w-12 rounded-full" /></div>
                                            <div className="w-full ml-3 h-full my-auto p-2 rounded-lg bg-blue-700">{props.msg.message}</div>
                                        </div>
                                        <div className="mt-1"><ReactTimeAgo date={props.msg.createdAt} locale="en-US" /></div>
                                    </>)
                                })
                            }
                        </div>
                    </div>
            }
        </div>
    )
}

import Axios from 'axios'
import ReactTimeAgo from 'react-time-ago'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from "../context/AuthContext"
import Liked from '@mui/icons-material/Favorite';
import Like from '@mui/icons-material/FavoriteBorderOutlined';
import Save from '@mui/icons-material/Bookmark';
import PublicIcon from '@mui/icons-material/Public';
import { useNavigate } from 'react-router-dom';
import UserProfile from './UserProfile';

export default function Post(props) {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext)
    const [postdata, setPostdata] = useState([props.postInfo])
    const [postprofile, setPostprofile] = useState([])

    useEffect(() => {
        const getProfile = async () => {
            await Axios.get("http://localhost:3001/getprofilepic/" + props.postInfo.user_id)
            .then((Response) => {
                setPostprofile([Response.data])
            })
            
        }
        getProfile()
    },[])
    const like = async(id) =>{
        try {
            await Axios.put("http://localhost:3001/likeordislike/like/"+ id , {liker : user._id})
            .then((res)=>{
                setPostdata([res.data])
            })
        } catch (error) {}
    }
    const dislike = async(id) =>{
        try {
            await Axios.put("http://localhost:3001/likeordislike/dislike/"+ id , {liker : user._id})
            .then((res)=>{
                setPostdata([res.data])
            })
        } catch (error) {}
    }
    const userprofile = (id,name) =>{
        navigate('/userprofile' , {state : {user_id : id ,user_name : name ,from : "post"  }})
    }

    return (
        <div>
            {
                postdata &&
                postdata.map((h) => {
                    const base64 = btoa(String.fromCharCode(...new Uint8Array(h.post.data.data)))
                    return (<div className="mx-4 my-1 border border-gray-400 rounded-lg" >
                        <div className="mx-auto my-3 flex items-center">
                            {postprofile &&
                                postprofile.map((pp) => {
                                    const profilepicbase64 = btoa(String.fromCharCode(...new Uint8Array(pp.profilepic.data.data)));
                                    return (<img src={`data:image/png;base64,${profilepicbase64}`} className="ml-24 w-16 rounded-full shadow shadow-gray-500" alt="user" />)
                                })}
                            <div className="w-1/2 px-5 cursor-pointer" onClick={e => userprofile(h.user_id,h.user_name)}>{h.user_name}</div>
                            <div className="w-1/2 float-right"><PublicIcon fontSize='small' /> : <ReactTimeAgo date={h.createdAt} locale="en-US" /></div>
                            <br />
                        </div>
                        <hr className="border border-gray-400" />
                        <div className="w-3/4 mx-auto">
                            <p className="px-5 py-2">{h.description}</p>
                            <img src={`data:image/png;base64,${base64}`} className="w-11/12 mx-auto border-2 border-black" alt="post" />
                        </div>
                        <hr className="border border-gray-400" />
                        <div className='w-3/4 mx-auto'>
                            {
                                (h.like.includes(user._id)) 
                                ?
                                    <button onClick={e => dislike(h._id)} className="`px-5 `"><Liked fontSize='large' className="bg-white my-2 text-red-500 mx-2 hover:cursor-pointer" />{((h.like.length - 1) === 0) ? "you"  : " you, "+ (h.like.length - 1) +" other" } </button>
                                :
                                    <button onClick={e => like(h._id)} className="`px-5 `"><Like fontSize='large' className="bg-white my-2 text-red-500 mx-2 hover:cursor-pointer" />{h.like.length}</button>
                            }
                            <button className="float-right px-5"><Save fontSize='large' className="bg-white  my-2 text-red-500" ></Save>save</button>
                        </div>
                    </div>)
                })
            }
        </div>
    )
}

import React, { useContext, useEffect, useState } from 'react'
import Axios from 'axios'
import swal from 'sweetalert'
import { AuthContext } from "../context/AuthContext"
import {  useNavigate } from 'react-router-dom'

export default function Following(props) {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext)
    const [followings, setFollowing] = useState()
    const [followingImage, setFollowingImage] = useState([])
    useEffect(() => {
        async function fetchData() {
            const response = await Axios.get("http://localhost:3001/getprofilepic/" + props.following)
            // console.log(response.data)
            setFollowing(response.data.user_name)
            setFollowingImage([response.data])
            //console.log(response.data)

        }
        fetchData()
    },[])

    const unFollow = (e, to) => {
        e.preventDefault()
        Axios.put("http://localhost:3001/unfollow_following/" + user._id, { to: to })
            .then((Response) => {
                swal({
                    title: "Done",
                    text: Response.data.msg,
                    icon: "success"
                })
                props.function()
            })
            .catch((err) => {
                alert(err)
            })
    }
    const see = (id,name) =>{
        navigate('/userprofile' , {state : {user_id : id ,user_name : name,from : "friend"  }})
    }
    return (
        <>
        {
            followingImage &&
            followingImage.map((image) => {
                const image64 = btoa(String.fromCharCode(...new Uint8Array(image.profilepic.data.data)))
                return (<>
                    <form className="flex border-b-2 border-gray-500 p-2 items-center" onSubmit={e => unFollow(e, image.user_id)}>

                        <img src={`data:image/png;base64,${image64}`} alt="b" className="w-16 rounded-full" />
                        <div className="h-full my-auto mx-3 w-5/6 cursor-pointer " onClick={e => see(image.user_id , image.user_name)}>
                            {followings}
                        </div>
                        <div className='w-1/2'>
                            <input type="submit" className="rounded  cursor-pointer w-full py-2 border-4 border-white hover:border-cyan-700 bg-cyan-500 hover:bg-cyan-700 text-white float-right" value="Unfollow" />
                        </div>
                    </form>
                </>)
            })
        }
    </>
    )
}

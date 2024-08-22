import React, { useContext, useEffect, useState } from 'react'
import Axios from 'axios'
import swal from 'sweetalert'
import { AuthContext } from "../context/AuthContext"
import { Navigate, useNavigate } from 'react-router-dom'

export default function Follower(props) {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext)
    const [followers, setFollower] = useState()
    const [followerImage, setFollowerImage] = useState()

    useEffect(() => {

        async function fetchData() {
            const Response = await Axios.get("http://localhost:3001/getprofilepic/" + props.follower)
            setFollower(Response.data.user_name)
            setFollowerImage([Response.data])
            // console.log(Response.data)
        }
        fetchData()
    }, [])

    const Remove = (e, to) => {
        e.preventDefault()
        Axios.put("http://localhost:3001/remove_follower/" + user._id, { to: to })
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

    const sub = (id,name) =>{
        navigate('/userprofile' , {state : {user_id : id ,user_name : name ,from : "friend" }})
    }
    return (<>
        {
            followerImage &&
            followerImage.map((image) => {
                const image64 = btoa(String.fromCharCode(...new Uint8Array(image.profilepic.data.data)))
                return (
                    <>
                    <form className="flex border-b-2 border-gray-500 p-2 items-center"  onSubmit={e => Remove(e, image.user_id)}  >

                        <img src={`data:image/png;base64,${image64}`} alt="b" className="w-16 rounded-full" />
                        <div className="h-full my-auto mx-3 w-5/6 cursor-pointer" onClick={e => sub(image.user_id , image.user_name)}>
                            {followers}
                        </div>
                        <div className='w-1/2'>
                            <input type="submit" className="rounded  cursor-pointer py-2 border-4 w-full border-white hover:border-cyan-700 bg-cyan-500 hover:bg-cyan-700 text-white float-right"  value="Remove" />
                        </div>
                    </form>
                    </>
                )
            })
        }

    </>
    )
}

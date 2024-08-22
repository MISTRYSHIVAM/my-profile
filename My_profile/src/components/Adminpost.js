import React from 'react'
import Axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert'
import { AuthContext } from "../context/AuthContext"

export default function Adminpost(props) {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext)

    const [newPost, setnewPost] = useState(
        {
            description: '',
            image: ''
        }
    );
    const [allpost , setPost ] = useState();
    const handleDescription = (e) => {
        setnewPost({ ...newPost, [e.target.name]: e.target.value })
    }

    const handleImage = (e) => {
        setnewPost({ ...newPost, image: e.target.files[0] });
    }

    const submitCall = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('org_name', props.org_name)
        data.append('description', newPost.description)
        data.append('image', newPost.image)
        //console.log(data)
        if (newPost.description) {
            Axios.post("http://localhost:3001/pagepost/" + props.page_id, data)
                .then(res => {
                    swal({
                        title: "Done",
                        text: res.data.msg,
                        icon: "success"
                    })
                    navigate('/admin')
                })
                .catch(err => {
                    swal({
                        title: "error",
                        text: err.err,
                        icon: "warning"
                    })
                    navigate('/admin')
                })
        }
        else {
            swal({
                title: "error",
                text: "please enter the description",
                icon: "warning"
            })
        }
    }
    const remove = () => {
        setnewPost({ image: '' })
    }
    const here = async () => {
        const postdata = await Axios.get("http://localhost:3001/getpagepost/" + props.page_id)
        setPost(postdata.data)
    }

    useEffect(() => {
        if (user) {
            here()
        }
        else {
            navigate('/')
        }
    }, [user, navigate])
    return (
        <div className="">
            <div className=" mx-auto">
                <div className="py-1">
                    <h1 align="center" className="text-xl">Post preview</h1>
                    <div className="bg-white w-2/3 h-96 mt-5 mx-auto rounded-xl border-2 border-gray-400">
                        {
                            newPost.image &&
                            <img src={URL.createObjectURL(newPost.image)} alt="hh" className="w-full rounded-xl h-full" />
                        }
                    </div>
                    <form onSubmit={submitCall} encType="multipart/form-data" className="w-2/3 my-1 mx-auto" >
                        <input type="file" placeholder="" name="image" onChange={handleImage} className="file:rounded file:border-none file:cursor-pointer file:mx-1 file:p-3  file:bg-cyan-500 file:hover:bg-cyan-700 file:text-white my-3 w-auto" /><br />
                        <textarea type="text" placeholder="description" rows="3" name="description" value={newPost.description} onChange={handleDescription} className=" px-3 py-3 mb-3 border border-cyan-200 focus:outline-blue-700 rounded w-full mr-4  placeholder:text-gray-400 shadow-lg" /><br />
                        <div className="flex justify-between border-gray-500 border-t-2 mb-3 ">
                            <input type="button" className="rounded cursor-pointer px-10 py-3 mb-3 border-4 border-white hover:border-cyan-700 bg-cyan-500 hover:bg-cyan-700 text-white mt-3 " value={"Change"} onClick={remove} />
                            <input type="submit" className="rounded cursor-pointer px-10 py-3 mb-3 border-4 border-white hover:border-cyan-700 bg-cyan-500 hover:bg-cyan-700 text-white mt-3  mx-10" value="Post" />
                        </div>
                    </form>

                    <div className="border-2 border-red-900 m-2 text-xl font-bold text-center p-2 rounded-xl">{props.org_name}'s Posts</div>
                    <div className="grid grid-cols-2 text-center" >
                        {
                            allpost &&
                            allpost.map((p) => {
                                const post = btoa(String.fromCharCode(...new Uint8Array(p.post_pic.data.data)))
                                return (
                                    <>
                                        <div className="">
                                            <img src={`data:image/png;base64,${post}`} alt="b" className="w-full p-2 shadow-xl" />
                                        </div>
                                    </>
                                )

                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

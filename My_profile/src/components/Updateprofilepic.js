import React, { useState } from 'react'
import Axios from 'axios'
import swal from 'sweetalert'
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Updateprofilepic() {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
        }
        else {
            navigate('/')
        }
    }, [user, navigate]);
    const [userProfilepic, setuserProfilepic] = useState(
        {
            image: '' 
        }
    );

    const handleImage = (e) => {
        setuserProfilepic({ image: e.target.files[0] });
    }

    const remove = () => {
        setuserProfilepic({ image: '' })
    }

    const submitCall = (e) => {
        e.preventDefault();
        const data1 = new FormData();
        data1.append('image', userProfilepic.image)
        // console.log(data)
        Axios.post("http://localhost:3001/profilepic/update/"+user._id , data1)
        .then(res => {
          swal({
            title: "Done",
            text: res.data.msg,
            icon: "success"
          })
          navigate('/')
        })
        .catch(err => {
          swal({
            title: "error",
            text: err.err,
            icon: "warning"
          })
          navigate('/home')
        })
    }
    
    return (
        <div className="py-4 bg-gray-300">
                <div className="w-6/12 px-5 mx-auto">
                    <div className="shadow-md rounded-xl border-2 border-gray-500 shadow-gray-500 bg-white py-1 ">
                        <h1 className="border-2 border-red-900 m-2 rounded-xl font-bold text-center p-2" >Profile Photo</h1>
                        <div className="p-5 w-full mx-auto bg-white" >
                            <div className='w-48 h-48 border-2 rounded-full border-black mx-auto'>
                            {
                                userProfilepic.image &&
                                (<>
                                    <img src={URL.createObjectURL(userProfilepic.image)} alt="here" className="h-48 w-48 mx-auto rounded-full" />
                                </>)
                            }
                                
                            </div>
                            <button onClick={remove} className="rounded cursor-pointer px-10 py-3 mb-3 border-4 border-white hover:border-cyan-700 bg-cyan-500 hover:bg-cyan-700 text-white mt-3" >Change</button>
                            
                            <div className="mt-1 mx-auto">
                            <form onSubmit={submitCall} encType="multipart/form-data" >
                                <input type="file" placeholder="" name="image" onChange={handleImage} className="file:rounded file:border-none file:cursor-pointer file:mx-1 file:p-3 text-transparent file:bg-cyan-500 file:hover:bg-cyan-700 file:text-white mt-3 " /><br />
                                <input type="submit" className="rounded  cursor-pointer px-10 py-3 mb-3 border-4 border-white hover:border-cyan-700 bg-cyan-500 hover:bg-cyan-700 text-white mt-3" value="set as profile photo" />
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            
        </div>
    )
}
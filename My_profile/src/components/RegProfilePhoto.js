import React, { useState } from 'react'
import Axios from 'axios'
import swal from 'sweetalert'
import { useLocation, useNavigate } from 'react-router-dom';

export default function RegProfilePhoto() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const user_id = state.user_id;
    const user_name = state.user_name;

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
        data1.append('user_name', user_name )
        data1.append('profileState', "yes" )
        // console.log(data)
        Axios.post("http://localhost:3001/profilepic/"+user_id , data1)
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
          navigate('/regprofilephoto')
        })
    }
    const skip = () => {
        const data2 = new FormData();
        data2.append('image', '')
        data2.append('user_name', user_name )
        data2.append('profileState', "no" )
        // console.log(data)
        Axios.post("http://localhost:3001/profilepic/"+user_id , data2)
        .then(res => {
            swal({
              title: "Done",
              text: res.data.msg,
              icon: "success"
            })
            navigate('/')
        })
    }
    return (
        <div className="bg-gray-100 h-screen mx-auto overflow-hidden font-semibold">
            <div className=" w-screen h-screen mx-auto flex" >
                <div className="w-1/2 pl-72">
                    <p className="mt-32 p-2 text-7xl my-2 bg-cyan-500 rounded-xl text-left font-mono text-white">My Profile</p>
                    <p className="text-xl p-2 text-left rounded-xl font-mono bg-white text-cyan-500">grab opportunites now !</p>
                </div>
                <div className="py-10  w-1/2 mx-auto">
                    <div className="w-2/3 mx-auto rounded-xl bg-white px-3" >
                        <h1 className="text-2xl text-center" >Profile Photo</h1>
                        <div className="p-5 w-full mx-auto bg-white" >
                            <div className='w-48 h-48 border-2 rounded-full border-black mx-auto'>

                            {
                                userProfilepic.image &&
                                (<>
                                    <img src={URL.createObjectURL(userProfilepic.image)} alt="here" className="h-48 w-48 mx-auto rounded-full" />
                                </>
                                    )
                                }
                                
                            </div>
                            <button onClick={remove} className="rounded cursor-pointer px-10 py-3 mb-3 border-4 border-white hover:border-cyan-700 bg-cyan-500 hover:bg-cyan-700 text-white mt-3" >Change</button>
                            
                            <div className="mt-1 mx-auto">
                            <form onSubmit={submitCall} encType="multipart/form-data" >
                                <input type="file" placeholder="" name="image" onChange={handleImage} className="file:rounded file:border-none file:cursor-pointer file:mx-1 file:p-3 text-transparent file:bg-cyan-500 file:hover:bg-cyan-700 file:text-white mt-3 " /><br />
                                <input type="submit" className="rounded  cursor-pointer px-10 py-3 mb-3 border-4 border-white hover:border-cyan-700 bg-cyan-500 hover:bg-cyan-700 text-white mt-3" value="set as profile photo" />
                            </form>
                                <button className="rounded  cursor-pointer px-10 py-3 mb-3 border-4 border-white hover:border-cyan-700 bg-cyan-500 hover:bg-cyan-700 text-white mt-3" onClick={skip} >Skip</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
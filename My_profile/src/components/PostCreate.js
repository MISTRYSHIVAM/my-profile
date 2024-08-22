import Axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert'
import { AuthContext } from "../context/AuthContext"

export default function PostCreate() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext)
  const [newUser, setnewUser] = useState(
    {
      description: '',
      image: '',
      like: 25
    }
  );

  const handleDescription = (e) => {
    setnewUser({ ...newUser, [e.target.name]: e.target.value })
  }

  const handleImage = (e) => {
    setnewUser({ ...newUser, image: e.target.files[0] });
  }

  const submitCall = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('user_name', user.user_name)
    data.append('description', newUser.description)
    data.append('image', newUser.image)
    data.append('like', newUser.like)
    console.log(data)
    if (newUser.description) {
      Axios.post("http://localhost:3001/post_create/" + user._id, data)
        .then(res => {
          swal({
            title: "Done",
            text: res.data.msg,
            icon: "success"
          })
          navigate('/home')
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
    else {
      swal({
        title: "error",
        text: "please enter the description",
        icon: "warning"
      })
    }
  }
  const remove = () => {
    setnewUser({ image: '' })
  }
  const back = () => {
    navigate('/home')
  }

  useEffect(() => {
    if (user) {

    }
    else {
      navigate('/')
    }
  }, [user, navigate])

  return (<>
    <div className="py-4 bg-gray-300  h-screen">
      <div className="w-3/12 bg-white fixed rounded-xl border-2 border-gray-300 font-semi"></div>
      <div className="w-6/12 px-5 mx-auto">

        <div className="shadow-md rounded-xl border-2 border-gray-500 shadow-gray-500 bg-white py-1 ">
          <h1 align="center" className="text-xl">Post preview</h1>
          <div className="bg-white w-2/3 h-96 mt-5 mx-auto rounded-xl border-2 border-gray-400">
            {
              newUser.image &&
              <img src={URL.createObjectURL(newUser.image)} alt="hh" className="w-full rounded-xl h-full" />
            }
          </div>
          <form onSubmit={submitCall} encType="multipart/form-data" className="w-2/3 my-1 mx-auto" >
            <input type="file" placeholder="" name="image" onChange={handleImage} className="file:rounded file:border-none file:cursor-pointer file:mx-1 file:p-3  file:bg-cyan-500 file:hover:bg-cyan-700 file:text-white my-3 w-auto" /><br />
            <textarea type="text" placeholder="description" rows="3" name="description" value={newUser.description} onChange={handleDescription} className=" px-3 py-3 mb-3 border border-cyan-200 focus:outline-blue-700 rounded w-full mr-4  placeholder:text-gray-400 drop-shadow-lg" /><br />
            <div className="flex justify-between border-gray-500 border-t-2 mb-3 ">
              <input type="button" className="rounded cursor-pointer px-10 py-3 mb-3 border-4 border-white hover:border-cyan-700 bg-cyan-500 hover:bg-cyan-700 text-white mt-3 " value={"Change"} onClick={remove} />
              <input type="submit" className="rounded cursor-pointer px-10 py-3 mb-3 border-4 border-white hover:border-cyan-700 bg-cyan-500 hover:bg-cyan-700 text-white mt-3  mx-10" value="Post" />
              <input type="button" className="rounded  cursor-pointer px-10 py-3 mb-3 border-4 border-white hover:border-cyan-700 bg-cyan-500 hover:bg-cyan-700 text-white mt-3 float-right" value="Back" onClick={back} />
            </div>
          </form>
        </div>
      </div>
      <div className="w-3/12 rounded-xl bg-white fixed right-0 top-16 border-2 border-gray-300"></div>
    </div>


  </>)
}
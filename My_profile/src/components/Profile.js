import React, { useContext, useEffect, useState } from 'react'
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import EditIcon from '@mui/icons-material/Edit';
import swal from 'sweetalert'
import { adminUp } from '../API';

export default function Profile() {
    const navigate = useNavigate();
    const { user, dispatch } = useContext(AuthContext)
    const [userProfilepic, setuProfilepic] = useState();
    const [userAddress, setuAddress] = useState();
    const [userPosts, setuPosts] = useState();
    const [userSkill, setuSkill] = useState();
    const [logedin, setLogedin] = useState();
    const [cn , setCn ] = useState("hidden")
    const [ newname , setNewname ] = useState('')

    const theuserData = async () => {
        const uprofile = "http://localhost:3001/getprofilepic/";
        const uaddress = "http://localhost:3001/user_getpersonalinfo/";
        const uposts = "http://localhost:3001/displayimage/user/";
        const uskills = "http://localhost:3001/user_get_skill_status/";

        const req1 = await Axios.get(uprofile + user._id)
        const req2 = await Axios.get(uaddress + user._id)
        const req3 = await Axios.get(uposts + user._id)
        const req4 = await Axios.get(uskills + user._id)

        Axios.all([req1, req2, req3, req4])
            .then(
                Axios.spread((...response) => {
                    if (response[0].status === 200) {
                        //console.log(response[0].data)
                        setuProfilepic([response[0].data]);
                    }

                    if (response[1].status === 200) {
                        //console.log(response[1].data)
                        setuAddress(response[1].data);
                    }

                    if (response[2].status === 200) {
                        console.log(response[2].data)
                        setuPosts(response[2].data);
                    }

                    if (response[3].status === 200) {
                        setuSkill([response[3].data]);
                        //console.log(response[3].data)
                    }

                })
            )
    }

    const yo = () => {
        alert("yo man")
    }
    const changeName = () => {
        setCn((cn === 'block')?'hidden':'block')
    }
    const updateN = ()=>{
        if(newname !== null)
        {
            Axios.post("http://localhost:3001/update/"+user._id , {newname : newname}).then(function (response) {
                if (response.data.success === true) {
                    adminUp({name : newname} , dispatch)
                    swal({
                        title: "Done",
                        text: response.data.message,
                        icon: "success"
                    })
                    setCn('block')
                }
        })
        }
        else
        {
            swal({
                title: "Opps !",
                text: "please enter user name",
                icon: "warning"
            })
        }
        
    }

    const logout = () => {
        dispatch({ type: "LOGOUT" })
        navigate('/')
    }
    useEffect(() => {
        if (user) {
            theuserData()
            setLogedin(user.user_name)
        }
        else {
            navigate('/')
        }
    }, [user, navigate]);


    return (
        <>
            <div className="py-4 bg-gray-300 " >
                <div className="w-6/12 px-5 mx-auto">
                    <div className="shadow-md border-2 rounded-xl border-gray-500 shadow-gray-500 bg-white p-3">
                        <div className="bg-gray-200 p-3 rounded-xl">
                            <div className="border-2 border-red-900 m-2 text-xl font-bold text-center p-2 rounded-xl">{logedin}</div>
                            {
                                userProfilepic &&
                                userProfilepic.map((up) => {
                                    const image64 = btoa(String.fromCharCode(...new Uint8Array(up.profilepic.data.data)))
                                    return (<>
                                        <div className="flex">
                                            <div className='w-1/2 mx-auto'><img src={`data:image/png;base64,${image64}`} alt="b" className="w-56 rounded-full bg-white shadow-xl mx-14" /></div>
                                            <div className="w-1/2 my-auto text-4xl">
                                                {user.user_name}<EditIcon fontSize='medium' className='float-right mt-3' onClick={changeName} />
                                            </div>
                                        </div></>)
                                })
                            }
                        </div>
                        <EditIcon fontSize='medium' className='float-right mt-3' onClick={yo} />
                        <div className="flex justify-between mx-5 py-2 text-lg" >
                            {
                                userAddress &&
                                userAddress.map((data) => {
                                    return (
                                        <><div className="p-2 w-1/2 border-r-2 border-gray-300 ">
                                            <div className="text-lg font-bold">State : {data.user.state}</div>
                                            <div className="text-lg font-bold">
                                                City : {data.user.city}
                                            </div>
                                            <div className="text-lg font-bold">
                                                Age : {data.user.age}
                                            </div>
                                        </div >
                                            <div className="w-1/2 p-2">
                                                <div className="text-lg font-bold">
                                                    Follower : {data.user.follower.length}
                                                </div>
                                                <div className="text-lg font-bold">
                                                    Following : {data.user.following.length}
                                                </div>
                                                <div className="text-lg font-bold">
                                                    <Link to='/fpassword' className="underline" >Change password</Link>
                                                </div>
                                                <div className="text-lg font-bold">
                                                    <button className="rounded  cursor-pointer px-5 py-2 my-3 border-4 border-white hover:border-cyan-700 bg-cyan-500 hover:bg-cyan-700 text-white " onClick={logout} >log-out</button>
                                                </div>
                                            </div>

                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>


                    <div className=" mx-auto shadow-md rounded-xl border-2  to-white border-gray-500 shadow-gray-500 bg-white my-5" >
                        <div className="border-2 border-red-900 m-2 text-xl font-bold text-center p-2 rounded-xl">{logedin}'s Posts</div>

                        <div className="grid grid-cols-2 text-center" >
                            {
                                userPosts &&
                                userPosts.map((p) => {
                                    const post = btoa(String.fromCharCode(...new Uint8Array(p.post.data.data)))
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
                    <div className=" mx-auto shadow-md rounded-xl border-2  to-white border-gray-500 shadow-gray-500 bg-white" >

                        <div className="border-2 border-red-900 m-2 text-xl font-bold text-center p-2 rounded-xl">{logedin}'s Skill & Status</div>
                        {
                            userSkill &&
                            userSkill.map((s) => {
                                return (<>
                                    {
                                        s.userskill.map((d) => {
                                            return (<>
                                                <div className="flex">
                                                    <div className="p-2 w-1/2 border-r-2 border-gray-300 ">
                                                        <div className='text-lg font-bold'>Skill Area : </div>
                                                        <div className="px-3">{
                                                            d.skill_area.map((skills) => {
                                                                return (<>{skills}<br /></>)
                                                            })
                                                        }
                                                        </div>
                                                        <div className="text-lg font-bold">Expectred_job : </div>
                                                        <div className="px-3">{d.expect_job}</div>
                                                    </div>

                                                    <div className='p-2 w-1/2'>
                                                        <div className="text-lg font-bold">Status : </div>
                                                        <div className="px-3">{d.status}</div>
                                                        {

                                                            (d.status === "student"
                                                                ? <>
                                                                    <div className="text-lg font-bold"> University </div>
                                                                    <div className="px-3">{d.university}</div>
                                                                </>
                                                                :
                                                                <div>
                                                                    <div className="text-lg font-bold"> Current job </div>
                                                                    <div className="px-3">{d.current_job}</div>
                                                                    <div className="text-lg font-bold"> Current company </div>
                                                                    <div className="px-3">{d.current_company}</div>
                                                                    <div className="text-lg font-bold"> Job type </div>
                                                                    <div className="px-3">{d.job_type}</div>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </>)
                                        })
                                    }
                                </>)
                            })
                        }
                    </div>
                </div>
                <div className={`p-2 border-2 bg-white rounded-lg border-gray-700 ${cn} fixed top-1/3 right-1/3`}>
                <h2 className="  text-black text-base">Change user name .</h2>
                    <input type="text" placeholder='Enter new name' value={newname} onChange={e=>setNewname(e.target.value)} className=" px-3 py-3 mb-3 border border-cyan-200 focus:outline-blue-700 rounded w-full mr-4 placeholder:text-gray-400 drop-shadow-lg" />
                    <button className="rounded  cursor-pointer px-10 py-3 mb-3 border-4 border-white hover:border-cyan-700 bg-cyan-500 hover:bg-cyan-700 text-white mt-3" onClick={e=>setCn('hidden')}>Close</button>
                    <button className="rounded  cursor-pointer px-10 py-3 mb-3 border-4 border-white hover:border-cyan-700 bg-cyan-500 hover:bg-cyan-700 text-white mt-3 float-right" onClick={updateN}>Change</button>
                </div>
            </div>

        </>
    )
}

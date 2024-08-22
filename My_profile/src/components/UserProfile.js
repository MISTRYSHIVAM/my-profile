import React, { useContext, useEffect, useState } from 'react'
import Axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { followFriend, unFollow } from '../API';
import Back from '@mui/icons-material/KeyboardBackspace';

export default function UserProfile() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext)
    const { state } = useLocation();
    const [luserProfile, setLuserprofile] = useState('')
    const [userProfilepic, setProfilepic] = useState();
    const [userAddress, setAddress] = useState();
    const [userPosts, setPosts] = useState();
    const [userSkill, setSkill] = useState();


    const userData = async () => {
        const profile = "http://localhost:3001/getprofilepic/";
        const address = "http://localhost:3001/user_getpersonalinfo/";
        const posts = "http://localhost:3001/displayimage/user/";
        const skills = "http://localhost:3001/user_get_skill_status/";
        const luser = "http://localhost:3001/user_getpersonalinfo/";

        const req1 = await Axios.get(profile + state.user_id)
        const req2 = await Axios.get(address + state.user_id)
        const req3 = await Axios.get(posts + state.user_id)
        const req4 = await Axios.get(skills + state.user_id)
        const req5 = await Axios.get(luser + user._id)

        Axios.all([req1, req2, req3, req4, req5])
            .then(
                Axios.spread((...response) => {
                    if (response[0].status === 200) {
                        //console.log(response[0].data)
                        setProfilepic([response[0].data]);
                    }

                    if (response[1].status === 200) {
                        //console.log(response[1].data)
                        setAddress(response[1].data);
                    }

                    if (response[2].status === 200) {
                        //console.log(response[2].data)
                        setPosts(response[2].data);
                    }

                    if (response[3].status === 200) {
                        setSkill([response[3].data]);
                        //console.log(response[3].data)
                    }
                    if (response[4].status === 200) {
                        response[4].data.map((d)=>{
                            setLuserprofile(d.user)
                        })
                    }

                })
            )
    }
    useEffect(() => {
        if (user) {
            userData()
        }
        else {
            navigate('/')
        }
    }, [user, navigate])

    const unFollowg = async(who , to) => {
        await unFollow(who , to)
        userData()
    }
    const followFriendg = async(from ,to) => {
        await followFriend(from ,to)
        userData()
    }

    const back = () => {
        if( state.from === "friend")
        {
            navigate('/friends')
        }
        else if ( state.from === "admin" )
        {
            navigate('/admin')
        }
        else
        {
            navigate('/home')
        }
    }
    return (<>
        <div className="w-6/12 py-5 mx-auto">
            <div className="shadow-md rounded-xl border-2  to-white border-gray-500 shadow-gray-500 bg-white">
                <button className="m-4 fixed top-98 rounded px-5 cursor-pointer border-white bg-cyan-500 hover:bg-cyan-700 text-white" onClick={back}><Back fontSize='large' /></button>
                <div className="border-2 border-red-900 m-2 text-2xl font-bold text-center p-2 rounded-xl">
                    {state.user_name}
                </div>
                <div className="bg-gray-200 p-3 rounded-xl">
                    {
                        userProfilepic &&
                        userProfilepic.map((up) => {
                            const image64 = btoa(String.fromCharCode(...new Uint8Array(up.profilepic.data.data)))
                            return (<div className="flex">
                                <div className='w-1/2 mx-auto'><img src={`data:image/png;base64,${image64}`} alt="b" className="w-56 rounded-full bg-white shadow-xl mx-14" /></div>
                                <div className="w-1/2 my-auto text-4xl">
                                    {state.user_name}
                                </div>
                            </div>)
                        })
                    }
                </div>
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
                                        {
                                            (luserProfile.following.includes(state.user_id)) ?
                                                <button  className="rounded cursor-pointer py-1 px-3 mb-3 border-4 border-white hover:border-cyan-700 bg-cyan-500 hover:bg-cyan-700 text-white mt-3" onClick={e => unFollowg(user._id , state.user_id)}>Unfollow</button>
                                                :
                                                <button  className="rounded cursor-pointer py-1 px-3 mb-3 border-4 border-white hover:border-cyan-700 bg-cyan-500 hover:bg-cyan-700 text-white mt-3" onClick={e => followFriendg(user._id , state.user_id)}>Follow</button>
                                        }
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </div>
        <div className="w-1/2 mx-auto shadow-md rounded-xl border-2  to-white border-gray-500 shadow-gray-500 bg-white mb-5" >
            <div className="border-2 border-red-900 m-2 text-xl font-bold text-center p-2 rounded-xl">{state.user_name}'s Posts</div>
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
        <div className="w-1/2 mx-auto shadow-md rounded-xl border-2  to-white border-gray-500 shadow-gray-500 bg-white" >
            <div className="border-2 border-red-900 m-2 text-xl font-bold text-center p-2 rounded-xl">{state.user_name}'s Skill & Status</div>
            {
                userSkill &&
                userSkill.map((s) => {
                    return (<>
                        {
                            s.userskill.map((d) => {
                                return (<div className="flex">
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
                                </div>)
                            })
                        }
                    </>)
                })
            }
        </div>
    </>)
}
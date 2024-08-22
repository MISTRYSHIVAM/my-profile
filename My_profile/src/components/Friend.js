import React, { useState, useEffect, useContext } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../context/AuthContext"
import Follower from './Follower'
import Following from './Following'
import swal from 'sweetalert'
import Search from '@mui/icons-material/Search';
import Allraedyadd from '@mui/icons-material/Check';

export default function Friend() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext)

    const [personalInfoData, setPData] = useState([])
    const [skillData, setSkillData] = useState([])
    const [friendsData, setFriendData] = useState([])
    const [friendsObj, setFriendobg] = useState([])
    const [ searchFriend , setFriend ] = useState('empty')

    const request = async () => {
        let cityurl = "http://localhost:3001/friend_in_city/";
        let skillurl = "http://localhost:3001/friend_in_skill/";
        let friendurl = "http://localhost:3001/friends/";

        const friendIncity = await Axios.get(cityurl + user._id)
        const friendInskill = await Axios.get(skillurl + user._id)
        const userFriend = await Axios.get(friendurl + user._id)

        Axios.all([friendIncity, friendInskill, userFriend])
            .then(
                Axios.spread((...response) => {
                    if (response[0].status === 200) {
                        setPData(response[0].data);
                        //console.log(response[0].data)
                    }

                    if (response[1].status === 200) {
                        setSkillData(response[1].data);
                        //console.log(response[1].data);
                    }

                    if (response[2].status === 200) {
                        setFriendData([response[2].data]);
                        setFriendobg(response[2].data);
                    }
                })
            )
    }
    const userprofile = (id,name) =>{
        navigate('/userprofile' , {state : {user_id : id ,user_name : name,from : "friend"  }})
    }

    useEffect(() => {
        if (user != null) {
            request()
        }
        else {
            navigate('/')
        }
    }, [user, navigate]);

    const followFriend = (e, from ) => {
        e.preventDefault()
        Axios.put("http://localhost:3001/followfriend/" + user._id, { to: from, fromn : user.user_name  })
            .then((Response) => {
                swal({
                    title: "Done",
                    text: Response.data.msg,
                    icon: "success"
                })
                request()
            })
            .catch((err) => {
                alert(err)
            })
    }

    const feching = async (e) => {
        let key = e.target.value.toLowerCase();
        if(key)
        {
            let searchdata = await Axios.get("http://localhost:3001/search/friend/"+key)
            if(searchdata !== "no")
            {
                setFriend(searchdata.data)
            }
            else
            {
                setFriend('no')
            }
        }
        else
        {
            setFriend('empty')
        }
    }


    return (
        <div className="py-4 bg-gray-300">
            <div className="w-3/12 bg-white fixed rounded-xl border-2 pb-3 border-gray-300 font-semi">
                <div className='border-2 border-red-900 text-center rounded-xl font-bold m-2 p-2'>
                    Follower
                </div>
                {
                    friendsData &&
                    friendsData.map((data) => {
                        return data.follower.map((person) => {
                            return <Follower follower={person} function={request} />
                        })
                    })
                }
            </div>
            <div className="w-6/12 px-5 mx-auto">
                <div className="shadow-md border-2 rounded-xl border-gray-500 shadow-gray-500 bg-white p-3">
                    <div className="flex text-xl border-2 rounded-lg border-blue-500">
                        <button className="bg-blue-50 px-2 py-2  rounded-l-lg cursor-text " ><Search fontSize='large' className="text-blue-400" /></button>
                        <input type="search" placeholder="Search by name" onChange={feching}  className=" py-1 pr-3 border-l-0 rounded-r-lg focus:outline-none bg-blue-50 border-cyan-200 w-full placeholder:text-gray-500" />
                    </div>
                    <div className="grid grid-cols-3 m-2 gap-20 text-center h-60 overflow-y-scroll ">
                        {
                            (searchFriend !== 'no' && searchFriend !== 'empty')
                            ?
                            searchFriend.map((sdata) => {
                                const p = btoa(String.fromCharCode(...new Uint8Array(sdata.profilepic.data.data)))
                                return (<form onSubmit={e => followFriend(e, sdata.user_id)}>
                                    <img src={`data:image/png;base64,${p}`} className="rounded-full shadow-xl mb-2" alt="user" />
                                    <div onClick={e => userprofile(sdata.user_id , sdata.user_name)} className="cursor-pointer">{sdata.user_name}</div>
                                    {
                                        (friendsObj.following.includes(sdata.user_id))
                                        ?
                                            <button className="rounded cursor-pointer p-1 mb-3 border-4 border-cyan-500 hover:border-cyan-700 bg-white text-cyan-500 mt-3" disabled="true"><Allraedyadd /> following</button>
                                        :
                                            <input type="submit" className="rounded  cursor-pointer w-full py-2 my-3 border-4 border-white hover:border-cyan-700 bg-cyan-500 hover:bg-cyan-700 text-white" value="Follow" />
                                    }
                                </form>)
                            })
                            :
                            (searchFriend === "no")
                            ?
                                "! Not found"
                            :
                                "Search by name"
                        }
                    </div>
                    <h1 className="border-2 border-red-900 my-2 rounded-xl font-bold text-center p-2" >People from your cities</h1>
                    <div className="grid grid-cols-3 m-2 gap-20 text-center" >
                        {
                            personalInfoData &&
                            personalInfoData.map((friend) => {
                                const profile64 = btoa(String.fromCharCode(...new Uint8Array(friend.profilepic.data.data)))
                                return (
                                    <form className="w-full mx-auto" onSubmit={e => followFriend(e, friend.user_id)} >
                                        <img src={`data:image/png;base64,${profile64}`} className="rounded-full shadow-xl mb-2" alt="user" />
                                        <div className="mx-auto" >
                                            <div onClick={e => userprofile(friend.user_id , friend.user_name)} className="cursor-pointer">{friend.user_name}</div>
                                            <input type="submit" className="rounded  cursor-pointer w-full py-2 my-3 border-4 border-white hover:border-cyan-700 bg-cyan-500 hover:bg-cyan-700 text-white" value="follow" />
                                        </div>
                                    </form>
                                )
                            })
                        }
                    </div>

                    <h1 className="border-2 border-red-900 text-center rounded-xl font-bold my-2 p-2">People from your field</h1>
                    <div className="grid grid-cols-3 m-2 gap-20 text-center">
                        {
                            skillData &&
                            skillData.map((friend2) => {
                                const image64 = btoa(String.fromCharCode(...new Uint8Array(friend2.profilepic.data.data)))
                                return (
                                    <form className="w-full mx-auto" onSubmit={e => followFriend(e, friend2.user_id)} >
                                        <img src={`data:image/png;base64,${image64}`} className="rounded-full shadow-xl mb-2" alt="user" />
                                        <div className="mx-auto" >
                                        <div onClick={e => userprofile(friend2.user_id , friend2.user_name)} className="cursor-pointer">{friend2.user_name}</div>
                                            <input type="submit" className="rounded  cursor-pointer w-full py-2 border-4 border-white hover:border-cyan-700 bg-cyan-500 hover:bg-cyan-700 text-white mt-3" value="follow" />
                                        </div>
                                    </form>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="w-3/12 rounded-xl bg-white fixed right-0 pb-3 top-16 border-2 border-gray-300">
                <div className='border-2 border-red-900 text-center rounded-xl font-bold m-2 p-2'>
                    Following
                </div>
                {
                    friendsData &&
                    friendsData.map((data) => {
                        return data.following.map((person) => {
                            return <Following following={person} function={request} />
                        })
                    })
                }
            </div>
        </div>
    )
}
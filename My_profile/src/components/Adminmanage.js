import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Axios from 'axios'
import Search from '@mui/icons-material/Search';
import swal from 'sweetalert';

export default function Adminmanage(props) {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext)
    const [searchValue, setSvalue] = useState();
    const [adminList, setAdminlist] = useState();
    const sch = async (e) => {
        let key = e.target.value.toLowerCase();
        if (key) {
            let searchdata = await Axios.get("http://localhost:3001/findadmin/" + key)
            if (searchdata) {
                setSvalue(searchdata.data)
                //console.log(searchdata.data)
            }
        }
        else {
            setSvalue("")
        }
    }
    const call = async () => {
        const da = await Axios.get("http://localhost:3001/adminlist/" + props.page_id)
        setAdminlist(da.data)
        //console.log(props.org_admin)
    }
    const add = async (user_id) => {
        Axios.put("http://localhost:3001/addadmin/"+props.page_id, { user_id })
            .then((Response) => {
                swal({
                    title: "Done",
                    text: Response.data,
                    icon: "success"
                })
                call()
            })
            .catch((err) => {
                alert(err)
            })
    }

    const remove = async (user_id) => {
        alert(user_id)
        Axios.put("http://localhost:3001/removeadmin/"+props.page_id, { user_id })
            .then((Response) => {
                swal({
                    title: "Done",
                    text: Response.data,
                    icon: "success"
                })
                call()
            })
            .catch((err) => {
                alert(err)
            })
    }

    useEffect(() => {
        if (user != null) {
            call()
        }
        else {
            navigate('/')
        }
    }, [user, navigate]);
    return (
        <div className='m-3'>
            <div className="flex text-xl border-2 rounded-lg border-blue-500">
                <button className="bg-blue-50 px-2 py-2  rounded-l-lg cursor-text " ><Search fontSize='large' className="text-blue-400" /></button>
                <input type="search" placeholder="Search by name" onChange={sch} className=" py-1 pr-3 border-l-0 rounded-r-lg focus:outline-none bg-blue-50 border-cyan-200 w-full placeholder:text-gray-500" />
            </div>
            <div className="h-72 border-2 overflow-y-scroll mt-2 rounded-lg border-gray-800">
                {
                    searchValue &&
                    searchValue.map((d) => {
                        const i = btoa(String.fromCharCode(...new Uint8Array(d.profilepic.data.data)))
                        return (<>
                            <div className="flex p-2 justify-between border-b-2 border-gray-700" >
                                <img src={`data:image/png;base64,${i}`} className="rounded-full h-16 shadow-xl mb-2" alt="user" />
                                <div className="my-auto w-1/2 mx-3">{d.user_name}</div>
                                {
                                (props.org_admin.includes(d.user_id))
                                ?
                                    <button className="w-1/2 rounded cursor-pointer p-1 mb-3 border-4 border-cyan-500 bg-white text-cyan-500 mt-3"  disabled={"true"}>Admin</button>
                                :
                                    <button className="rounded w-1/2 cursor-pointer p-2 my-3 border-4 border-white hover:border-cyan-700 bg-cyan-500 hover:bg-cyan-700 text-white" onClick={e => add(d.user_id)}>Add to admin</button>
                                }
                            </div>
                            </>)
                    })
                }
            </div>
            <div className="h-72 border-2 overflow-y-scroll mt-2 rounded-lg border-gray-800">
                <h1 className="border-2 border-red-900 m-2 rounded-lg font-bold text-center p-2" >page admin</h1>
                {
                    adminList &&
                    adminList.map((d) => {
                        const i = btoa(String.fromCharCode(...new Uint8Array(d.profilepic.data.data)))
                        return (
                            <div className="flex p-2 justify-between border-b-2 border-gray-700" >
                                <img src={`data:image/png;base64,${i}`} className="rounded-full h-16 shadow-xl mb-2" alt="user" />
                                <div className="my-auto w-1/2 mx-3">{d.user_name}</div>
                                {
                                    props.page_info.map((x) => {
                                        return (<>
                                            {
                                                (x.org_owner === d.user_name)
                                                &&
                                                <button className="w-1/2 rounded p-1 mb-3 border-4 border-cyan-500 bg-white text-cyan-500 mt-3" disabled={"true"}>owner</button>
                                            }
                                            {
                                                (d.user_name === user.user_name)
                                                &&
                                                <button className="w-1/2 rounded p-1 mb-3 border-4 border-cyan-500 bg-white text-cyan-500 mt-3"  disabled={"true"}>Me</button>
                                            }
                                            {
                                                (d.user_name !== user.user_name && x.org_owner !== d.user_name)
                                                &&
                                                <button className="rounded w-1/2 cursor-pointer p-2 my-3 border-4 border-white hover:border-cyan-700 bg-cyan-500 hover:bg-cyan-700 text-white" onClick={e => remove(d.user_id)} >remove to admin</button>
                                            }
                                        </>)
                                    })
                                }

                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

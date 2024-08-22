import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Admindata from './Admindata';

export default function Aboutadmin(props) {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext)
    const [pageinfo, setPageinfo] = useState('')
    const [adminsprofile, setAdminprofile] = useState([])
    const [pagefollower, setPagefollower] = useState();
    const [post, setPost] = useState([])
    const test = async () => {
        const data = await Axios.get('http://localhost:3001/email/')
        alert(data.data)
    }

    const data = async () => {
        let req1 = "http://localhost:3001/page_data/"
        let req2 = "http://localhost:3001/get_page_info/"
        let req3 = "http://localhost:3001/getpagepost/"

        const admindata = await Axios.get(req1 + user._id)
        const pageinfo = await Axios.get(req2 + user._id)
        const pagepost = await Axios.get(req3 + props.page_id)

        Axios.all([admindata, pageinfo, pagepost])
            .then(
                Axios.spread((...response) => {
                    if (response[0].status === 200) {
                        setPageinfo([response[0].data])
                        setAdminprofile(response[0].data.org_admin)
                    }

                    if (response[1].status === 200) {
                        setPagefollower(response[1].data);
                        //console.log([response[1].data]);

                    }

                    if (response[2].status === 200) {
                        setPost(response[2].data);
                        // console.log(response[2].data);

                    }
                })
            )
    }

    useEffect(() => {
        if (user != null) {
            data()
        }
        else {
            navigate('/')
        }
    }, [user, navigate])
    return (<>
        <div className=" rounded-xl border-2  to-white border-gray-500 m-1 bg-white">
            {
                pageinfo &&
                pageinfo.map((x) => {
                    const img = btoa(String.fromCharCode(...new Uint8Array(x.org_pic.data.data)))
                    return (<div className="m-2">
                        <div className="rounded-lg p-2 bg-slate-300">
                            <img src={`data:image/png;base64,${img}`} className="rounded-full w-36 bg-white shadow-xl m-2" alt="n" />
                        </div>
                        <div className="flex m-2">
                            <div className="w-1/2 border-r-2 border-gray-300 p-2">
                                <div>Company : {x.org_name}</div>
                                Web-site : <span className="underline cursor-pointer">{x.org_website}</span>
                            </div>
                            <div className="w-1/2 p-2">
                                <div>Owner : {x.org_owner}</div>
                                <div>Followers : {pagefollower.page_follower.length}</div>
                            </div>
                        </div>
                        {/* <button className="rounded  cursor-pointer py-2 border-4 w-full border-white hover:border-cyan-700 bg-cyan-500 hover:bg-cyan-700 text-white" onClick={test} >Send email</button> */}
                    </div>)
                })
            }
        </div>
        <div className=" rounded-xl border-2  to-white border-gray-500 m-1 bg-white">
            <div className='p-2 text-center  rounded-t-xl'>
                <p className="text-xl">Welcome to your new Company Pages admin center!</p>
                <br />
                
            </div>
        </div>

        <div className=" rounded-xl border-2  to-white border-gray-500 m-1 bg-white">
            <div>this page is managed by ..</div>
            <div className="grid grid-cols-3 p-2 text-center ">
                {
                    adminsprofile &&
                    adminsprofile.map((d) => {
                        return (<>
                            <Admindata id={d} />
                        </>)
                    })
                }
            </div>
        </div>
    </>)
}

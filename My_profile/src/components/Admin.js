import Axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'
import Adminupdate from './Adminupdate';
import Adminpost from './Adminpost';
import Adminmanage from './Adminmanage';
import Adminnoti from './Adminnoti';
import Chart from 'react-apexcharts'
import img from '../images/project_logo.jpg'

export default function Admin() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext)

    const [admin, setAdmin] = useState();
    const [page_id, setId] = useState();
    const [org_name, setName] = useState();
    const [lastweekfollower, setWf] = useState();
    const [lastmonthfollower, setMf] = useState();
    const [adminarray, setArray] = useState();
    const [pageInfo, setPageinfo] = useState();
    const [d1, setD1] = useState('border-blue-700');
    const [d2, setD2] = useState('border-white');
    const [d3, setD3] = useState('border-white');
    const [d4, setD4] = useState('border-white');
    const [state, setstate] = useState()
    const [state1, setstate1] = useState()

    const data = async () => {
        let req1 = "http://localhost:3001/admin/"
        let req2 = "http://localhost:3001/page_info/"
        let req3 = "http://localhost:3001/thismonth/"
        let req4 = "http://localhost:3001/thisyear/"

        const admindata = await Axios.get(req1 + user._id)
        const pageinfo = await Axios.get(req2 + user._id)
        const lastweek = await Axios.get(req3 + user._id)
        const lastmonth = await Axios.get(req4 + user._id)

        Axios.all([admindata, pageinfo, lastweek, lastmonth])
            .then(
                Axios.spread((...response) => {
                    if (response[0].status === 200) {
                        setAdmin([response[0].data]);
                        setId(response[0].data._id)
                        setName(response[0].data.org_name)
                        setArray(response[0].data.org_admin)
                        //console.log(response[0].data)
                    }

                    if (response[1].status === 200) {
                        setPageinfo([response[1].data]);
                        //console.log([response[1].data]);

                    }
                    if (response[2].status === 200) {
                        setWf(response[2].data.length);
                        //console.log([response[1].data]);
                        setstate({
                            options: {
                                chart: {
                                  id: "basic-bar"
                                },
                                xaxis: {
                                  categories: ["this month page follower"]
                                }
                              },
                              series: [
                                {
                                  name: "page follower",
                                  data: [response[2].data.length]
                                }
                              ]
                            })

                    }
                    if (response[3].status === 200) {
                        setMf(response[3].data.length);
                        //console.log([response[1].data]);
                        // alert(response[3].data)
                        setstate1({
                            options: {
                                chart: {
                                  id: "basic-bar"
                                },
                                xaxis: {
                                  categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                                }
                              },
                              series: [
                                {
                                  name: "page follower",
                                  data: response[3].data
                                }
                              ]
                            })
                    }
                })
            )
    }
    // const d = new Date()
    useEffect(() => {
        if (user != null) {
            data()
            // alert(d.getMonth())
        }
        else {
            navigate('/')
        }
    }, [user, navigate])
    return (<>
        <div className="py-4 bg-gray-300 h-full">
            <div className="w-3/12 mt-2 bg-white fixed rounded-xl border-2 border-gray-300 font-semi ">
                {
                    admin ?
                        admin.map((x) => {
                            const img = btoa(String.fromCharCode(...new Uint8Array(x.org_pic.data.data)))
                            return (<div className='m-2'>
                                <div className='w-full text-center'>
                                    <div className="bg-slate-200 rounded-lg">
                                        <img src={`data:image/png;base64,${img}`} className="rounded-full bg-white w-48 mx-auto shadow-xl m-2" alt="n" />
                                    </div>
                                    welcome {x.org_name}
                                    <div className='overflow-y-scroll'>
                                        analysis <br />
                                        {/* <div>lastweekfollower {lastweekfollower}</div>
                                        <div>lastmonthfollower {lastmonthfollower}</div> */}
                                        <div>
                                            <Chart options={state.options} series={state.series} type="bar" width="300" />
                                        </div>
                                        <div>
                                            <Chart options={state1.options} series={state1.series} type="bar" width="300" />
                                        </div>
                                    </div>
                                </div></div>)
                        })
                        :
                        "no"
                }
            </div>
            <div className="w-6/12 px-5 py-2 mx-auto ">
                <div className="shadow-md rounded-xl border-2 border-gray-500 shadow-gray-500 bg-white">
                    <div className="flex border-b-2 border-gray-500 ">
                        <button className={`text-center w-1/4 px-4 py-1 my-2 ${d1} border-b-4 cursor-pointer`} onClick={e => { setD1("border-blue-700"); setD2("border-white"); setD3("border-white"); setD4("border-white") }}>
                            Updates
                        </button>
                        <button className={`text-center w-1/4 px-4 py-1 my-2 ${d2} border-b-4 cursor-pointer`} onClick={e => { setD2("border-blue-700"); setD1("border-white"); setD3("border-white"); setD4("border-white") }} >
                            Post
                        </button>
                        <button className={`text-center w-1/4 px-4 py-1 my-2 ${d3} border-b-4 cursor-pointer`} onClick={e => { setD3("border-blue-700"); setD2("border-white"); setD1("border-white"); setD4("border-white") }} >
                            Manage
                        </button>
                        <button className={`text-center w-1/4 px-4 py-1 my-2 ${d4} border-b-4 cursor-pointer`} onClick={e => { setD4("border-blue-700"); setD2("border-white"); setD3("border-white"); setD1("border-white") }} >
                            Notification
                        </button>
                    </div>

                    <div className="w-full">
                        {
                            (d1 === "border-blue-700") && (<Adminupdate page_id={page_id} />)
                        }
                        {
                            (d2 === "border-blue-700") && (<Adminpost page_id={page_id} org_name={org_name} />)
                        }
                        {
                            (d3 === "border-blue-700") && (<Adminmanage page_id={page_id} page_info={admin} org_admin={adminarray} />)
                        }
                        {
                            (d4 === "border-blue-700") && (<Adminnoti />)
                        }
                    </div>
                </div>
            </div>
            <div className="w-3/12 rounded-xl bg-white fixed right-0 top-20 border-2 border-gray-300">
                <div className='p-2'>
                    add information about your company
                </div>
                <div className="w-1/4  rounded-xl bg-white fixed right-0 bottom-52 border-2 border-gray-300 ">
                    <div>
                    <Link to="/about" >About</Link>
                    </div>
                    <div className="flex">
                    <img src={img} className="w-10" />My_profile © 2023

                    </div>
                </div>
            </div>
        </div>
    </>)
}

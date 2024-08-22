import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Axios from 'axios'
import ReactTimeAgo from 'react-time-ago'
import Select from 'react-select'
import swal from 'sweetalert';

export default function Job() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext)
    const [Recrutment, setRecrutment] = useState('')
    const [magic, setMagic] = useState('hidden')
    const [subRecrutment, setsubRecrutment] = useState({ rec_no: '', user_id: '', user_name: '', email: '', jobtype: '' })
    const [opt, setopt] = useState('')
    const [userSelect, setSelect] = useState('')
    const [rec_no, setNo] = useState(0)
    const [page_id, setPageid] = useState('')

    const get = async () => {
        const data = await Axios.get('http://localhost:3001/getrecrutment/' + user._id)
        if (data.data !== "not found") {
            setRecrutment([data.data])
            console.log(data.data)
        }
        else {
            setRecrutment('')
        }
    }

    const res = (data, page_id) => {
        const setdata = []
        setMagic('block')
        setNo(data.rec_no)
        setPageid(page_id)
        data.jobtype.map((d) => {
            setdata.push({ value: d, label: d })
        })
        setopt(setdata)
    }
    const done = async (no) => {
        await setsubRecrutment({ ...subRecrutment, user_id: user._id, user_name: user.user_name, email: user.email, rec_no: no })
        const submission = await Axios.post('http://localhost:3001/submitrecrutment/' + page_id, subRecrutment)
        if (submission) {
            swal({
                title: "Done",
                text: submission.data,
                icon: "success"
            })
        }
    }
    const call = (d) => {
        const cc = []
        d.map((x) => {
            cc.push(x.label)
        })
        setsubRecrutment({ ...subRecrutment, jobtype: cc })
    }
    const c = (id) => {
        // alert("hi " + id)
    }

    useEffect(() => {
        if (user) {
            get()
        }
        else {
            navigate('/')
        }
    }, [user, navigate]);
    return (
        <div className="py-4 bg-gray-300 h-screen">
            <div className="w-6/12 mx-auto shadow-md rounded-xl border-2 border-gray-500 shadow-gray-500 bg-white ">
                <div className="border-b-2 border-gray-700 m-3">
                    {
                        Recrutment &&
                        Recrutment.map((d) => {
                            return (<>
                                <div className="border-2 border-red-900 my-2 rounded-xl font-bold text-center p-2"><b className="font-extrabold text-xl cursor-pointer" onClick={e => c(d.page_id)} >{d.org_name}</b> recrut employee in their company</div>
                                <div className="m-1">
                                    {
                                        d.recrutment_info.map((nd) => {
                                            const job_title = nd.jobtype
                                            return (
                                                <div className="flex">
                                                    <div className="w-2/3">
                                                        <div><b className="font-extrabold text-xl">Job title </b> : {
                                                            job_title &&
                                                            job_title.map((job) => {
                                                                return (job + " . ")
                                                            })
                                                        }
                                                        </div>
                                                        <div><b className="font-extrabold text-xl">Description</b> : {nd.description}</div>
                                                        <div><b className="font-extrabold text-xl">Contect</b> : {nd.email}</div>
                                                        <b className="font-extrabold text-xl">Posted : </b><ReactTimeAgo date={nd.date} locale="en-US" />
                                                    </div>
                                                    <div className="w-1/3 my-auto">
                                                        {
                                                            (user.isadmin === "yes")
                                                                ?
                                                                <div><button className="rounded p-2 w-full cursor-not-allowed border-4 border-cyan-500 hover:border-cyan-700 bg-white text-cyan-500 " disabled={true}> No </button></div>
                                                                :
                                                                <div><button className="rounded cursor-pointer w-full p-2 border-4 border-white hover:border-cyan-700 bg-cyan-500 hover:bg-cyan-700 text-white" onClick={e => res(nd, d.page_id)} > Responde </button></div>

                                                        }
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                            </>)
                        })
                    }
                </div>
                <div className={`fixed ${magic} bg-white p-2 border-2 border-black rounded-lg  w-1/2 top-auto left-auto `}>
                    <Select options={opt} defaultValue={userSelect} onChange={(v) => call(v)} isMulti />
                    <button className="rounded cursor-pointer px-10 py-2 border-4 border-white hover:border-cyan-700 bg-cyan-500 hover:bg-cyan-700 text-white" onClick={e => setMagic('hidden')}>Close</button>
                    <button className="rounded cursor-pointer px-10 py-2 border-4 border-white hover:border-cyan-700 bg-cyan-500 hover:bg-cyan-700 text-white" onClick={e => done(rec_no,)}>Submit</button>
                </div>
            </div>

        </div>
    )
}
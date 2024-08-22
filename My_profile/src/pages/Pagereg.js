import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import companyp from '../images/company.png'
import education from '../images/educational.png'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Select from 'react-select';
import Axios from 'axios';
import { adminUp } from '../API';
import swal from 'sweetalert';

export default function Pagereg() {

    const navigate = useNavigate();
    const { user,dispatch } = useContext(AuthContext)

    const [hide, setValue] = useState('none')
    const [show, settValue] = useState('hidden')
    const [orgCat, setType] = useState('')

    useEffect(() => {
        if (user != null) {
        }
        else {
            navigate('/')
        }
    }, [user, navigate])

    const orgSizeoption = [
        { value: 'select range', label: 'select range' },
        { value: '0 - 5 employees ', label: '0 - 5 employees ' },
        { value: '6 - 20 employees ', label: '6 - 20 employees  ' },
        { value: '21 - 40 employees ', label: '21 - 40 employees ' },
        { value: '41 - 50 employees ', label: '41 - 50 employees ' },
        { value: '51 - 70 employees ', label: '51 - 70 employees ' },
        { value: '71 - 100 employees ', label: '71 - 100 employees ' },
        { value: '101 - 500 employees ', label: '101 - 500 employees ' },
        { value: '501 - 1000 employees ', label: '501 - 1000 employees ' },
        { value: '1000 + employees ', label: '1000 + employees ' },
    ]
    const [comSize, setComsize] = useState(null)

    const orgTypeoption = [
        { value: 'public company', label: 'public company' },
        { value: 'self employed', label: 'self employed' },
        { value: 'governement agency', label: 'governement agency' },
        { value: 'non profilt', label: 'non profilt' },
        { value: 'pravitly held', label: 'pravitly held' },
        { value: 'partnership', label: 'partnership' },
    ]
    const [orgType, setOrgtype] = useState(null)

    const company = () => {
        setType("company")
        setValue("hidden")
        settValue("none")
    }
    const educational = () => {
        setType("education")
        setValue("hidden")
        settValue("none")
    }

    const back = () => {
        settValue("hidden")
        setValue("none")
        setPageinfo({ orgname: '', orgwebsite: '', industry: '', size: '', type: '' })
    }

    const handleImage = (e) => {
        setPageinfo({ ...pageInfo, image: e.target.files[0] });
        //console.log(pageInfo.image)
    }

    const remove = () => {
        setPageinfo({ ...pageInfo, image: '' })
    }
    const [ischeck, setCheck] = useState(false);

    const [pageInfo, setPageinfo] = useState({ orgname: '', orgwebsite: '', industry: '', size: '', type: '', image: '' })


    const call = async (e) => {
        e.preventDefault();
        const data = new FormData()
        data.append('orgname', pageInfo.orgname)
        data.append('orgwebsite', pageInfo.orgwebsite)
        data.append('industry', pageInfo.industry)
        data.append('org_owner', user.user_name)
        data.append('size', comSize.label)
        data.append('type', orgType.label)
        data.append('image', pageInfo.image)
        // console.log(data)
        await Axios.post("http://localhost:3001/page_authentication/" + user._id, data)
            .then(res => {
                swal({
                    title: "Done",
                    text: res.data.msg,
                    icon: "success"
                })
                adminUp({name : user.user_name} , dispatch)
                navigate('/admin' , {state : {user_id : user.user_id ,user_name : user.user_name }} )
            })
            .catch(err => {
                swal({
                    title: "Done",
                    text: err.err,
                    icon: "success"
                })
            })
    }
    return (
        <div className="bg-gray-100 mx-auto overflow-hidden font-mono font-semibold">
            <div className={`w-1/2 mx-auto mb-4 ${hide}`} >
                <p className="mt-3 p-2 text-5xl my-2 bg-cyan-500 rounded-xl text-left font-mono text-white">Create a My_profile page</p>
                <p className="text-md p-2 text-left rounded-xl font-mono bg-white text-cyan-500 mb-7">Connect with clients, employees, and the My_profile community.</p>
                <p className="text-center ">To get started, choose a page type.</p>
            </div>
            <div className={`flex w-1/2 mx-auto justify-around text-center ${hide}`}>
                <div className=" w-60 h-64 bg-white border-4 rounded-lg hover:border-gray-400 cursor-pointer" onClick={company}>
                    <img src={companyp} className="w-20 mx-auto bg-gray-100 mt-5 rounded-lg" />
                    <p className="px-1 text-lg font-bold my-5">Company</p>
                    <p className="p-1 text-base mb-10">Small, medium and large businesses</p>
                </div>
                <div className="w-60 h-64 bg-white border-4 rounded-lg hover:border-gray-400 cursor-pointer" onClick={educational}>
                    <img src={education} className="w-20 mx-auto bg-transparent mt-5 rounded-lg" alt="no" />
                    <p className="px-1 text-lg font-bold my-5">educational <br /> instution</p>
                    <p className="p-1 text-base mb-10">Schools and universities</p>
                </div>
            </div>

            <div className={`bg-white ${show} w-2/3 mx-auto my-4 shadow-md rounded-xl border-2 border-gray-500 shadow-gray-500 flex`}>
                <div className="bg-white w-1/2 mx-auto my-4" >
                    <button className={`${show} rounded mx-10 cursor-pointer px-10 py-3 mb-3 border-4 border-white hover:border-cyan-700 bg-cyan-500 hover:bg-cyan-700 text-white mt-3 `} onClick={back}  ><ArrowBackIcon /></button>
                    <form className="w-5/6 mx-auto" onSubmit={call}>
                        <h2 className="mb-2 text-black text-base">Enter your organization's name .</h2>
                        <input type="text" placeholder="organization's name" className="px-3 py-3 mb-3 border border-cyan-200 focus:outline-blue-700 rounded w-full mr-4 placeholder:text-gray-400 shadow-lg " value={pageInfo.orgname} onChange={e => setPageinfo({ ...pageInfo, orgname: e.target.value })} />
                        <h2 className="mb-2 text-black text-base">Enter your organization's website .</h2>
                        <input type="text" placeholder="organization's website" className=" px-3 py-3 mb-3 border border-cyan-200 focus:outline-blue-700 rounded w-full mr-4 placeholder:text-gray-400 shadow-lg" value={pageInfo.orgwebsite} onChange={e => setPageinfo({ ...pageInfo, orgwebsite: e.target.value })} />
                        <h2 className="mb-2 text-black text-base">industry.</h2>
                        <input type="text" placeholder="ex- information services , IT" className=" px-3 py-3 mb-3 border border-cyan-200 focus:outline-blue-700 rounded w-full mr-4 placeholder:text-gray-400 shadow-lg" value={pageInfo.industry} onChange={e => setPageinfo({ ...pageInfo, industry: e.target.value })} />
                        <h2 className="mb-2 text-black text-base">your organization's size .</h2>
                        <Select options={orgSizeoption} isClearable onChange={setComsize} defaultInputValue={comSize} className="cursor-text border rounded border-cyan-200 focus:outline-blue-700 mb-3" />
                        <h2 className="mb-2 text-black text-base">your organization's type .</h2>
                        <Select options={orgTypeoption} isClearable onChange={setOrgtype} defaultInputValue={orgType} className="cursor-text border rounded border-cyan-200 focus:outline-blue-700 mb-3" />
                        <h2 className="mb-2 text-black text-base">your organization's logo .</h2>
                        <input type="file" placeholder="" name="image" className="file:rounded file:border-none file:cursor-pointer file:mx-1 file:p-3 text-transparent file:bg-cyan-500 file:hover:bg-cyan-700 file:text-white my-3 " onChange={handleImage} />
                        <button onClick={remove} className="rounded cursor-pointer px-10 py-3 mb-3 border-4 border-white hover:border-cyan-700 bg-cyan-500 hover:bg-cyan-700 text-white mt-3" >Change</button><br />
                        <input type="checkbox" name="verify" defaultChecked={false} value={ischeck} onChange={e => setCheck(ischeck ? false : true)} /> I verify that I am an authorized representative of this organization and have the right to act on its behalf in the creation and management of this page. The organization and I agree to the additional terms for Pages.<br />
                        <input type="submit" disabled={!ischeck} className="rounded disabled:bg-cyan-700 disabled:cursor-not-allowed cursor-pointer px-10 py-3 mb-3 border-4 border-white hover:border-cyan-700 bg-cyan-500 hover:bg-cyan-700 text-white mt-3" value="upload" />
                    </form>
                </div>
                <div className=" w-1/2 mx-auto my-4">
                <div className="border-2 border-red-900 m-3 text-xl font-bold text-center p-2 rounded-xl">page review</div>
                    <div className="border-2 mt-5 mx-5 p-2 border-black">
                        <div className="w-36 h-44 border-2 border-gray-500">
                            {
                                pageInfo.image &&
                                <img src={URL.createObjectURL(pageInfo.image)} className="" alt='hi' />
                            }
                        </div>
                        <div>{pageInfo.orgname ? pageInfo.orgname : "company name"}</div>
                        <div>{pageInfo.orgwebsite ? pageInfo.orgwebsite : "website"}</div>
                        <div>{pageInfo.industry ? pageInfo.industry : "industry"}</div>
                        
                    </div>
                </div>
            </div>

        </div>
    )
}

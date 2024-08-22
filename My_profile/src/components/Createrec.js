import React, { useContext, useEffect, useState } from 'react'
import Select from 'react-select'
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import swal from 'sweetalert';

export default function Createrec(props) {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext)

    const joboption = [
        { value: 'web designer', label: 'web designer' },
        { value: 'web devloper', label: 'web devloper' },
        { value: 'data scientist', label: 'data scientist' },
        { value: 'database designer', label: 'database designer' },
        { value: 'database administrator', label: 'database administrator' },
        { value: 'UI devloper', label: 'UI devloper' },
        { value: 'UX devloper', label: 'UX devloper' }
    ]
    const [selectedJob, setSelectedJob] = useState(null);
    const [Recrutment , setRecrutment] = useState({job_type : '' , description : '' , email : ''})
    const go = async () =>{
        const data = await Axios.post('http://localhost:3001/createrecrutment/'+props.page_id, Recrutment)
        if(data.data.success === true)
        {
            swal({
                title: "Done",
                text: data.data.msg,
                icon: "success"
            })
        }
        else
        {
            swal({
                title: "Opps !",
                text: data.data.err,
                icon: "warning"
            })
        }
    }
    const call = (data) =>{
        const cc = []
        data.map((x)=>{
            cc.push(x.label)
        })
        setRecrutment({...Recrutment, job_type : cc})
    }

    

    useEffect(() => {
        if (user != null) {
            
        }
        else {
            navigate('/')
        }
    }, [user, navigate])

    return (
        <div>
            <h2 className="mb-1 text-black text-base" >Select which type of recrutment you gone to make.</h2>
            <Select defaultValue={selectedJob} isMulti onChange={(v) => call(v)} options={joboption} className="w-96 rounded-lg  border border-cyan-200 focus:outline-blue-700 " />
            <h2 className="mb-1 text-black text-base" >Enter email where you get response .</h2>
            <input type="email" placeholder="Contect email" value={Recrutment.email} onChange={e => setRecrutment({...Recrutment , email : e.target.value})} className=" px-3 py-3 mb-3 border border-cyan-200 focus:outline-blue-700 rounded w-full mr-4 placeholder:text-gray-400 drop-shadow-lg" required />
            <h2 className="mb-1 text-black text-base" >Enter recrutment description .</h2>
            <textarea type="text" placeholder="description" rows="3" name="description" value={Recrutment.description} onChange={e => setRecrutment({...Recrutment , description : e.target.value})} className=" px-3 py-3 mb-3 border border-cyan-200 focus:outline-blue-700 rounded w-full mr-4  placeholder:text-gray-400 shadow-lg" />
            <button onClick={go} className="rounded cursor-pointer py-2 px-5 ml-2 border-4 border-white hover:border-cyan-700 bg-cyan-500 hover:bg-cyan-700 text-white" >Send recrutment</button>
            <button onClick={go} className="rounded cursor-pointer py-2 px-5 ml-2 border-4 border-white hover:border-cyan-700 bg-cyan-500 hover:bg-cyan-700 text-white" >Viapost</button>
        </div>
    )
}

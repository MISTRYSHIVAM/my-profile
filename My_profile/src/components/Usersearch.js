import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Search from '@mui/icons-material/Search';
import swal from 'sweetalert';
import Axios from 'axios';
import Select from 'react-select';
import { City } from 'country-state-city'
import C from '@mui/icons-material/Cancel';

export default function Usersearch() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext)
    const [ob, setOb] = useState('hidden');

    const skilloption = [
        { value: 'web designer', label: 'web designer' },
        { value: 'web devloper', label: 'web devloper' },
        { value: 'data scientist', label: 'data scientist' },
        { value: 'database designer', label: 'database designer' },
        { value: 'database administrator', label: 'database administrator' },
        { value: 'UI devloper', label: 'UI devloper' },
        { value: 'UX devloper', label: 'UX devloper' }
    ]
    const [selectedSkill, setSelectedSkill] = useState({value : null , label : null});

    const cities = City.getCitiesOfCountry("IN")

    const cityoption = cities.map((all) => ({
        label: all.name,
        value: all.name
    }))
    const [Address, setAddress] = useState({ Country: "IN", City: null })
    const [seacheduser, setUser] = useState()

    const getting = async (e) => {
        let key = e.target.value;
        if (key) {
            if (selectedSkill.label || Address.City) {
                const df = []
                seacheduser.map((x) => {
                    if(x.user_name.toLowerCase().includes(key.toLowerCase()))
                    {
                        df.push(x)
                    }
                    else
                    {
                        console.log("no")
                    }
                })
                //console.log(df)
                setUser(df)
            }
            else
            {
                //alert("hi")
                let searchdata = await Axios.post("http://localhost:3001/getusers/" + key)
                if (searchdata) {
                    setUser(searchdata.data)
                    //console.log(searchdata.data)
                }
            }

        }
        else {
            if(selectedSkill.label || Address.City)
            {
                go()
            }
            else
            {
                setUser(null)
            }
        }
    }
    const x = () => {
        if (ob === "hidden") {
            setOb("bloack")
        }
        else {
            setOb("hidden")
        }
    }
    const call = (city) => {
        setAddress({ ...Address, City: city })
    }
    const call2 = (label) => {
        setSelectedSkill({value : label , label : label})
    }
    const go = async () => {
        //alert("k")
        console.log(selectedSkill)
        if (selectedSkill.label !== null && Address.City !== null ) {
            //alert("both")
            let bothdata = await Axios.post("http://localhost:3001/search/byboth", { bycity: Address.City, byskill: selectedSkill.label })
            if (bothdata) {
                setUser(bothdata.data)
                console.log(bothdata.data)
            }
        }
        else if (selectedSkill.label && Address.City === null) {
            //alert("skill")
            let skilldata = await Axios.post("http://localhost:3001/search/byskill", { byskill: selectedSkill.label })
            if (skilldata) {
                setUser(skilldata.data)
                //console.log(skilldata.data)
            }
        }
        else if (Address.City && selectedSkill.label === null) {
            //alert("ad")
            let citydata = await Axios.post("http://localhost:3001/search/bycity", { bycity: Address.City })
            if (citydata) {
                setUser(citydata.data)
                //console.log(citydata.data)
            }
        }
        else {
            setUser(null)
        }
        //alert("here")
        setOb("hidden")
    }
    const ask = async (id) =>{
        const data = await Axios.post("http://localhost:3001/askfor/"+user.user_name  , {to : id})
        .then((data)=>{
            if(data.data.msg === "Send")
            {
                    swal({
                        title: "Done",
                        text: data.data.msg,
                        icon: "success"
                    })
            }
        })
    }

    useEffect(() => {
        if (user != null) {
        }
        else {
            navigate('/')
        }
    }, [user, navigate,selectedSkill.label])
    return (
        <div className='w-full'>
            <div className="m-2">
                <div className="flex text-xl border-2 rounded-lg border-blue-500">
                    <button className="bg-blue-50 px-2 py-2  rounded-l-lg cursor-text " ><Search fontSize='large' className="text-blue-400" /></button>
                    <input type="search" placeholder="search" onChange={getting} className=" py-1 pr-3 w-full border-l-0 rounded-r-lg focus:outline-none bg-blue-50 border-cyan-200 placeholder:text-gray-500" />
                    <div className="rounded cursor-pointer my-auto py-1 px-5 ml-2 border-4 border-white hover:border-cyan-700 bg-cyan-500 hover:bg-cyan-700 text-white float-right mr-1" onClick={x} >filters</div>
                </div>
                <div className={`text-center absolute ${ob} right-1/4 mt-2 bg-white border-2 border-gray-700 rounded-lg p-1`}>
                    <div className='h-6'><button onClick={e => setOb("hidden")} className="float-right h-10" ><C /></button></div>
                    By skill <Select defaultValue={selectedSkill} value={selectedSkill.label} isMulti onChange={(label) => call2(label)} options={skilloption} className="w-96 rounded-lg  border border-cyan-200 focus:outline-blue-700 " />
                    By city <Select options={cityoption} isMulti value={Address.City} onChange={(city) => call(city)} className="w-96 rounded-lg  border-2 border-cyan-200 focus:outline-blue-700 " />
                    <button onClick={go} className="rounded cursor-pointer m-2 py-1 px-5 ml-2 border-4 border-white hover:border-cyan-700 bg-cyan-500 hover:bg-cyan-700 text-white" >Search</button>
                </div>
                <div className="h-96 mt-15 rounded-lg border-2 mt-2 border-gray-700 overflow-y-scroll w-full">
                    {
                        seacheduser &&
                        seacheduser.map((d) => {
                            const i = btoa(String.fromCharCode(...new Uint8Array(d.profilepic.data.data)))
                            return (<>
                                <div className="flex p-2 justify-between border-b-2 border-gray-700" >
                                    <img src={`data:image/png;base64,${i}`} className="rounded-full h-16 shadow-xl mb-2" alt="user" />
                                    <div className="my-auto w-1/2 mx-3">{d.user_name}</div>
                                    <div><button className='rounded  cursor-pointer w-full py-2 my-3 border-4 border-white hover:border-cyan-700 bg-cyan-500 hover:bg-cyan-700 text-white' onClick={e=>ask(d.user_id)}>Ask for work</button></div>
                                </div>
                            </>)
                        })
                    }
                </div>
            </div>
        </div>
    )
}

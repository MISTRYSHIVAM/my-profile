import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Usersearch from './Usersearch';
import Recrutment from './Recrutment';
import Aboutadmin from './Aboutadmin';

export default function Adminupdate(props) {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext)

    const [d1, setD1] = useState('border-blue-700');
    const [d2, setD2] = useState('border-white');
    const [d3, setD3] = useState('border-white');

    useEffect(() => {
        if (user != null) {
        }
        else {
            navigate('/')
        }
    }, [user, navigate])
    return (
        <div className="h-screen">
            <div className="flex p-2 border-b-2 border-gray-500">
            <button className={`text-center w-1/3 px-4 py-1 ${d1} border-b-4 cursor-pointer`} onClick={e => { setD1("border-blue-700"); setD2("border-white"); setD3("border-white") }}>
                About us
            </button>
            <button className={`text-center w-1/3 px-4 py-1  ${d2} border-b-4 cursor-pointer`} onClick={e => { setD2("border-blue-700"); setD1("border-white"); setD3("border-white") }} >
                Recrutment
            </button>
            <button className={`text-center w-1/3 px-4 py-1 ${d3} border-b-4 cursor-pointer`} onClick={e => { setD3("border-blue-700"); setD2("border-white"); setD1("border-white") }} >
                Search people
            </button>
            </div>
            <div className=" rounded-xl">
                        {
                            (d1 === "border-blue-700") && (<Aboutadmin page_id={props.page_id} />)
                        }
                        {
                            (d2 === "border-blue-700") && (<Recrutment page_id={props.page_id} />)
                        }
                        {
                            (d3 === "border-blue-700") && (<Usersearch page_id={props.page_id} />)
                        }
            </div>
        </div>
    )
}

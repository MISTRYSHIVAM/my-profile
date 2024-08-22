import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Createrec from './Createrec';
import Responserec from './Responserec';

export default function Recrutment(props) {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext)

    const [d1, setD1] = useState('border-blue-700');
    const [d2, setD2] = useState('border-white');

    useEffect(() => {
        if (user != null) {
        }
        else {
            navigate('/')
        }
    }, [user, navigate])
    return (
        <div>
            <div className="flex p-2 border-b-2 border-gray-500">

            <button className={`text-center w-1/2 px-4 py-1 ${d1} border-b-4 cursor-pointer`} onClick={e => { setD1("border-blue-700"); setD2("border-white")}}>
                Create Recrutment
            </button>
            <button className={`text-center w-1/2 px-4 py-1 ${d2} border-b-4 cursor-pointer`} onClick={e => { setD2("border-blue-700"); setD1("border-white") }} >
                response
            </button>
            </div>

            <div className=" m-2 rounded-xl">
                        {
                            (d1 === "border-blue-700") && (<Createrec page_id={props.page_id} />)
                        }
                        {
                            (d2 === "border-blue-700") && (<Responserec page_id={props.page_id} />)
                        }
            </div>
        </div>
    )
}

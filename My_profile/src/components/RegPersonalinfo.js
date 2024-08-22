import React, { useState } from 'react'
import Axios from 'axios'
import swal from 'sweetalert'
import { useLocation, useNavigate } from 'react-router-dom';
import Select from 'react-select'
import { State, City } from 'country-state-city'

export default function RegPersonalinfo() {
    const navigate = useNavigate();
    const [userPersonalData, setpData] = useState({ statecity: '', mobile_no: '', age: '' });
    const { state } = useLocation();
    const user_id = state.user_id;
    const user_name = state.user_name
    const personal_info = () => {
        Axios.post("http://localhost:3001/user_personal_information/create", { user_id: user_id, user_name: user_name, state: Address.State, city: Address.City, mobile_no: userPersonalData.mobile_no, age: userPersonalData.age }).then(function (response) {
            if (response.data.success === true) {
                swal({
                    title: "Done",
                    text: response.data.message,
                    icon: "success"
                })
                navigate('/regstatusskill', { state: { user_id: response.data.user.user_id, "user_name": response.data.user.user_name } })
            }
            else {
                swal({
                    title: "opps !",
                    text: response.data.errors,
                    icon: "warning",
                });
            }
        })
    };
    const [Address, setAddress] = useState({ Country: "IN", State: null, City: null })

    const allState = State.getStatesOfCountry("IN")

    const updatedState = allState.map((indianstate) => ({
        label: indianstate.name,
        name: indianstate.isoCode
    }))

    const updatedCity = (statecode) => City.getCitiesOfState(Address.Country, statecode)
        .map((statecity) => ({
            label: statecity.name,
            name: statecity.stateCode
        }))


    return (
        <div className="bg-gray-100 h-screen mx-auto overflow-hidden font-semibold" >

            <div className="w-screen h-screen mx-auto flex">
                <div className="py-10  w-1/2 mx-auto">
                    <div className="w-2/3 mx-auto rounded-xl bg-white px-3 ">
                        <h1 className="text-3xl py-5 text-center">Registration</h1>
                        <h2 className="mb-2 text-black text-center text-base" >personal_information</h2><br />
                        <h2 className="mb-2 text-black text-base">Choose your state .</h2>
                        <Select options={updatedState} isClearable value={Address.State} onChange={(state) => setAddress({ Country: "IN", State: state, City: '' })} className=" border border-cyan-200 focus:outline-blue-700" />
                        <br />
                        <h2 className="mb-2  text-black text-base">Choose your city .</h2>
                        <Select options={updatedCity(Address.State ? Address.State.name : null)} isClearable value={Address.City} onChange={(city) => setAddress({ ...Address, City: city })} className="border border-cyan-200 focus:outline-blue-700" />
                        <br />
                        <h2 className="mb-2  text-black text-base">Enter mobile number .</h2>
                        <input type="number" value={userPersonalData.mobile_no} onChange={e => setpData({ ...userPersonalData, mobile_no: e.target.value })} placeholder="Mobile number" className=" px-3 py-3 mb-3 border border-cyan-200 focus:outline-blue-700 rounded w-full mr-4 placeholder:text-gray-400 drop-shadow-lg" />
                        <h2 className="mb-2  text-black text-base">Age .</h2>
                        <input type="number" value={userPersonalData.age} onChange={e => setpData({ ...userPersonalData, age: e.target.value })} placeholder="Age" className=" px-3 py-3 mb-3 border border-cyan-200 focus:outline-blue-700 rounded w-full mr-4 placeholder:text-gray-400 drop-shadow-lg" />
                        <button className="rounded  cursor-pointer px-10 py-3 mb-3 border-4 border-white hover:border-cyan-700 bg-cyan-500 hover:bg-cyan-700 text-white mt-3" onClick={personal_info} >Save</button>
                        {/* <button onClick={show} className="rounded px-10 py-2 bg-blue-300 hover:bg-blue-600 text-white" >click-me</button> */}
                    </div>
                </div>
                <div className="w-1/2 pr-72">
                    <p className="mt-32 p-2 text-7xl my-2 bg-cyan-500 rounded-xl text-left font-mono text-white">My Profile</p>
                    <p className="text-xl p-2 text-left rounded-xl font-mono bg-white text-cyan-500">Make your profile grab opportunites !</p>
                </div>
            </div>
        </div>
    )
}



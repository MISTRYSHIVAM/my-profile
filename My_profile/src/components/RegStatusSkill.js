import React, { useState } from 'react'
import Axios from 'axios';
import swal from 'sweetalert';
import { useLocation, useNavigate } from 'react-router-dom';
import Select from 'react-select';

export default function RegStatus() {
    const navigate = useNavigate();
    const [userStatuSkillData, setStatuSkill] = useState({ status: '', university: '', recentjob: '', recentcompany: '', job_type: '', url: '', statusstudent: 'hidden', statusemployee: 'hidden', expect_job: '', expect_location: '' })
    const { state } = useLocation();
    const user_id = state.user_id;
    const user_name = state.user_name;

    const option = [
        { value: 'Full-time', label: 'Full-time' },
        { value: 'Part-time', label: 'Part-time' }
    ]
    const [selectedOption, setSelectedOption] = useState(null);

    const skilloption = [
        { value: 'web designer', label: 'web designer' },
        { value: 'web devloper', label: 'web devloper' },
        { value: 'data scientist', label: 'data scientist' },
        { value: 'database designer', label: 'database designer' },
        { value: 'database administrator', label: 'database administrator' },
        { value: 'UI devloper', label: 'UI devloper' },
        { value: 'UX devloper', label: 'UX devloper' }
    ]
    const [selectedSkill, setSelectedSkill] = useState(null);

    const status = () => {
        Axios.post(userStatuSkillData.url, { user_id: user_id,user_name : user_name , university: userStatuSkillData.university,skill_area : selectedSkill, current_job: userStatuSkillData.recentjob, current_company: userStatuSkillData.recentcompany, job_type: selectedOption , expect_job: userStatuSkillData.expect_job, expect_location: userStatuSkillData.expect_location  }).then(function (response) {
            console.log(user_id)
            if (response.data.success === true) {
                swal({
                    title: "Done",
                    text: response.data.message,
                    icon: "success"
                })
                navigate('/regprofilephoto', { state: { user_id: response.data.user.user_id, "user_name": response.data.user.user_name } })
            }
            else {
                swal({
                    title: "opps !",
                    text: response.data.errors,
                    icon: "warning",
                });
            }
        });
    };
    return (
        <div className="bg-gray-100 h-screen mx-auto overflow-hidden font-semibold">
            <div className="w-screen h-screen mx-auto flex" >
                <div className="py-2  w-1/2 mx-auto" >
                    <div className="w-2/3 mx-auto rounded-xl bg-white px-3 overflow-y-scroll h-full" >
                        <h2 className="text-3xl pt-5 pb-2 text-center" >Status & Skill</h2>
                        <h2 className="mb-2 text-black text-base">Are you student or employee .</h2>
                        {/* <input type="text" value={value} onChange={updateText} placeholder="State,city" className=" px-10 py-2 outline outline-4 outline-gray-500 rounded hover:outline-blue-300 focus:outline-blue-300 mr-4 placeholder:text-black" /> */}
                        <button className="rounded  cursor-pointer px-10 py-3 mb-3 border-4 border-white hover:border-cyan-700 bg-cyan-500 hover:bg-cyan-700 text-white " onClick={e => setStatuSkill({ ...userStatuSkillData, status: 'student', statusstudent: 'block', statusemployee: 'hidden', recentjob: '', recentcompany: '', job_type: '', url: 'http://localhost:3001/user_skill_status/student/create' })} >I'm student</button>
                        <button className="rounded  cursor-pointer px-10 py-3 mb-3 border-4 border-white hover:border-cyan-700 bg-cyan-500 hover:bg-cyan-700 text-white float-right" onClick={e => setStatuSkill({ ...userStatuSkillData, status: 'employee', statusemployee: 'block', statusstudent: 'hidden', university: '', url: 'http://localhost:3001/user_skill_status/employee/create' })} >I'm employee</button>
                        {/* <button onClick={show} className="rounded px-10 py-2 bg-blue-300 hover:bg-blue-600 text-white" >click-me</button> */}

                        <div className={`px-5 bg-white mx-auto ${userStatuSkillData.statusstudent}`} >
                            <h2 className="text-lg text-center" >Student .</h2><br />
                            <h2 className="mb-2 text-black text-base">Your profile help you to discover new people and opportunities .</h2>
                            <input type="text" value={userStatuSkillData.university} onChange={e => setStatuSkill({ ...userStatuSkillData, university: e.target.value })} placeholder="School/college/univercity" className=" px-3 py-3 mb-3 border border-cyan-200 focus:outline-blue-700 rounded w-full mr-4 placeholder:text-gray-400 drop-shadow-lg" />
                            <h2 className="mb-2 text-black text-base">Your Skill</h2>
                            <Select defaultValue={selectedSkill} isClearable isMulti onChange={setSelectedSkill} options={skilloption}  placeholder="Ex - web devloper" className=" border rounded border-cyan-200 focus:outline-blue-700 mb-3" />
                            <h2 className="mb-2 text-black text-base" >What kind of job you are looking for ?</h2>
                            <input type="text" value={userStatuSkillData.expect_job} onChange={e => setStatuSkill({ ...userStatuSkillData, expect_job: e.target.value })} placeholder="Ex - web designer" className=" px-3 py-3 mb-3 border border-cyan-200 focus:outline-blue-700 rounded w-full mr-4 placeholder:text-gray-400 drop-shadow-lg" />
                            <h2 className="mb-2 text-gray-600 text-base">job location .</h2>
                            <input type="text" value={userStatuSkillData.expect_location} onChange={e => setStatuSkill({ ...userStatuSkillData, expect_location: e.target.value })} placeholder="Ex-city" className=" px-3 py-3 mb-3 border border-cyan-200 focus:outline-blue-700 rounded w-full mr-4 placeholder:text-gray-400 drop-shadow-lg" />
                            <button className="rounded  cursor-pointer px-10 py-3 mb-3 border-4 border-white hover:border-cyan-700 bg-cyan-500 hover:bg-cyan-700 text-white mt-3" onClick={status} >Save</button>
                            {/* <button className="rounded px-10 py-2 bg-blue-300 hover:bg-blue-600 text-white shadow-xl" onClick={e => setStatuSkill({...userStatuSkillData ,status : 'employee',statusemployee : 'block',statusstudent : 'hidden' ,recentjob:'',recentcompany:''}) } >I'm employee</button> */}
                        </div>


                        <div className={`px-5 bg-white mx-auto ${userStatuSkillData.statusemployee}`} >
                            <h2 className="text-lg text-center" >Employee.</h2><br />
                            <h2 className="mb-2 text-black text-base ">Most recent job title .</h2>
                            <input type="text" value={userStatuSkillData.recentjob} onChange={e => setStatuSkill({ ...userStatuSkillData, recentjob: e.target.value })} placeholder="Job title" className=" px-3 py-3 mb-3 border border-cyan-200 focus:outline-blue-700 rounded w-full mr-4 placeholder:text-gray-400 drop-shadow-lg" />
                            <h2 className="mb-2 text-black text-base">Most recent company name .</h2>
                            <input type="text" value={userStatuSkillData.recentcompany} onChange={e => setStatuSkill({ ...userStatuSkillData, recentcompany: e.target.value })} placeholder="Compnay name" className=" px-3 py-3 mb-3 border border-cyan-200 focus:outline-blue-700 rounded w-full mr-4 placeholder:text-gray-400 drop-shadow-lg" />
                            <h2 className="mb-2 text-black text-base">Employee type .</h2>
                            <Select defaultValue={selectedOption} isClearable onChange={setSelectedOption} options={option} placeholder="Employee type : [full time - part time]" className=" border rounded border-cyan-200 focus:outline-blue-700 mb-3" />
                            <h2 className="mb-2 text-black text-base">Your Skill</h2>
                            <Select defaultValue={selectedSkill} isMulti onChange={setSelectedSkill} options={skilloption} placeholder="Ex-web designer" className=" border rounded border-cyan-200 focus:outline-blue-700 mb-3" />
                            <h2 className="mb-2 text-black text-base" >What kind of job you are looking for ?</h2>
                            <input type="text" value={userStatuSkillData.expect_job} onChange={e => setStatuSkill({ ...userStatuSkillData, expect_job: e.target.value })} placeholder="Ex-web designer" className=" px-3 py-3 mb-3 border border-cyan-200 focus:outline-blue-700 rounded w-full mr-4 placeholder:text-gray-400 drop-shadow-lg" />
                            <h2 className="mb-2 text-black text-base">job location .</h2>
                            <input type="text" value={userStatuSkillData.expect_location} onChange={e => setStatuSkill({ ...userStatuSkillData, expect_location: e.target.value })} placeholder="Ex-city" className=" px-3 py-3 mb-3 border border-cyan-200 focus:outline-blue-700 rounded w-full mr-4 placeholder:text-gray-400 drop-shadow-lg" />
                            <button className="rounded  cursor-pointer px-10 py-3 mb-3 border-4 border-white hover:border-cyan-700 bg-cyan-500 hover:bg-cyan-700 text-white " onClick={status} >Save</button>
                            {/* <button className="rounded px-10 py-2 bg-blue-300 hover:bg-blue-600 text-white shadow-xl" onClick={e => setStatuSkill({...userStatuSkillData ,status : 'student',statusstudent : 'block',statusemployee : 'hidden',university : ''})} >I'm student</button> */}
                            {/* <button onClick={show} className="rounded px-10 py-2 bg-blue-300 hover:bg-blue-600 text-white" >click-me</button> */}
                        </div>
                    </div>
                </div>
                <div className="w-1/2 pr-72">
                    <p className="mt-32 p-2 text-7xl my-2 bg-cyan-500 rounded-xl text-left font-mono text-white">My Profile</p>
                    <p className="text-xl p-2 text-left rounded-xl font-mono bg-white text-cyan-500 ">set status & skill and grab opportunites !</p>
                </div>
            </div>
        </div>
    )
}



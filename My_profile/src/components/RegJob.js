import React, { useState } from 'react'
import Axios from 'axios';
import swal from 'sweetalert';
import img1 from '../images/reg.png';
import img2 from '../images/job.png';
import { useLocation, useNavigate } from 'react-router-dom';

export default function RegJob() {
    const navigate = useNavigate();
    const [ userSkillData , setSkill ] = useState({ joblookingfor : '' , joblocationlookingfor : '' , needjob : ''})
    const { state } = useLocation();
    const { user_id } = state;
    const skill = () => {
        Axios.post("http://localhost:3001/user/skill", { user_id : user_id, expect_job: userSkillData.joblookingfor, expect_location: userSkillData.joblocationlookingfor, lookingfor_job: userSkillData.needjob }).then(function (response) {
            if (response.data.success === true) {
                swal({
                    title: "Done",
                    text: response.data.message,
                    icon: "success"
                })
                navigate('/regprofilephoto', { state: { user_id: response.data.user.user_id } })
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
    <div className="bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400  w-8/12 h-full mx-auto">
        <img src={img1} alt={"hello"} className="fixed left-32 top-20 h-1/3" />
        <img src={img2} alt={"hello"} className="fixed right-48 top-20 h-1/3" />
        <div className="p-5  w-1/2 mx-auto" >
                <h2 className="text-2xl text-center" >What kind of job you are looking for ?</h2><br />
                <h2 className="mb-2 text-gray-600 text-base">job title .</h2>
                <input type="text" value={userSkillData.joblookingfor} onChange={e => setSkill({ ...userSkillData, joblookingfor: e.target.value })} placeholder="Ex-web designer" className=" px-10 py-2 mb-3 outline outline-4 outline-gray-500 rounded hover:outline-blue-900 focus:outline-blue-300 mr-4 placeholder:text-gray-600 placeholder:text-center w-full shadow-xl" />
                <h2 className="mb-2 text-gray-600 text-base">job location .</h2>
                <input type="text" value={userSkillData.joblocationlookingfor} onChange={e => setSkill({ ...userSkillData, joblocationlookingfor: e.target.value })} placeholder="Ex-city" className=" px-10 py-2 mb-3 outline outline-4 outline-gray-500 rounded hover:outline-blue-900 focus:outline-blue-300 mr-4 placeholder:text-gray-600 placeholder:text-center w-full shadow-xl" />
                <h2 className="text-2xl text-center " >Are you looking for a job ?</h2><br />
                <div className="px-3 py-2 border-4 border-gray-500 rounded my-2 hover:border-blue-900 bg-white text-gray-600 shadow-xl" onChange={e => setSkill({ ...userSkillData, needjob: "yes" })} ><input type="radio" name='needjob' value="yes" />    Yes, i'm looking for a job</div>
                <div className="px-3 py-2 border-4 border-gray-500 rounded my-2 hover:border-blue-900 bg-white text-gray-600 shadow-xl" onChange={e => setSkill({ ...userSkillData, needjob: "no" })}><input type="radio" name='needjob' value="no" />     No, i'm not intrested in any job opportunities</div>
                <button className="rounded px-10 py-2 mb-3 out bg-blue-300 hover:bg-blue-600 text-white border-4 border-transparent  hover:border-blue-900 mt-3" onClick={skill} >Save</button>
        </div>
    </div>
  )
}

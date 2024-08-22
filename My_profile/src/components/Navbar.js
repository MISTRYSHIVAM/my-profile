import React, { useEffect, useState ,useContext } from 'react';
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import PeopleSharpIcon from '@mui/icons-material/PeopleSharp';
import NotificationsSharpIcon from '@mui/icons-material/NotificationsSharp';
import WorkSharpIcon from '@mui/icons-material/WorkSharp';
import PersonIcon from '@mui/icons-material/Person';
import Search from '@mui/icons-material/Search';
import C from '@mui/icons-material/Cancel';
import Axios from 'axios'
import { AuthContext } from '../context/AuthContext';
import { adminUp } from '../API';

export default function Navbar(props) {
    //const navigate = useLocation();
    const date = new Date();
    const { user , dispatch } = useContext(AuthContext)
    const [display,setDisplay] = useState('hidden')
    const [value,setValue] = useState('hidden')
    const [ PageInfo , setPage] = useState('empty')
    const [ PersonalInfo , setPersonalinfo] = useState('')

    const pcall = async() =>{
        const data = await Axios.get("http://localhost:3001/user_getpersonalinfo/"+user._id)

        data.data.map((x)=>{
            setPersonalinfo(x.user)
        })
    }

    useEffect(()=>{
        //console.log(PersonalInfo)
        if(user){
            pcall()
            setDisplay('block');
        }
        else
        {
            setDisplay('hidden');
        }
    },[user])
    const here = () => {
        if(value === 'hidden'){
            setValue('absolute')
        }
        else
        {
            setValue('hidden')
        }
    }
    const here2 = () => {
        if(user){
            setValue('hidden')
        }
    }

    const gettingPage = async(e) => {
        let key = e.target.value;
        if(key)
        {
            let searchdata = await Axios.get("http://localhost:3001/search/page/"+key , {user_id : user.user_id})
            if(searchdata !== "no")
            {
                setPage(searchdata.data)
            }
            else
            {
                setPage('no')
            }
        }
        else
        {
            setPage('empty')
        }
    }

    
    const hello = async(id) =>{
        Axios.post("http://localhost:3001/follow_page/"+id , { array : {user_id : user._id,user_name : user.user_name , date : date}})
        await adminUp({name : user.user_name} , dispatch);
    }
    
    return(<><div className={` border-b-2 border-gray-500 bg-white ${display} sticky top-0`} >
            <ul className="flex w-3/5 mx-auto bg-white">
                <Link to="/home" ><li className="px-10 py-2 " title="Home" ><HomeIcon fontSize="large" className="text-blue-500 hover:text-black" /></li></Link>
                <li className=" px-10 py-2" ><Search fontSize='large' className='absolute pt-2 ml-1 '/><input type="search" className="pl-10 pr-2 py-2 bg-blue-200 hover:outline-none focus:outline-none rounded w-full mr-4 placeholder:text-gray-700" onFocus={here}  onChange={gettingPage} placeholder="find Pages" /></li>
                <div className={`w-80 h-96 bg-white border-2 border-gray-500 rounded-md absolute mx-40 top-12 ${value} overflow-y-scroll`} onBlur={here2} >
                    <div><button onClick={here2} className="float-right h-10" ><C /></button></div>
                    <div className='mt-10'>
                    {
                        (PageInfo !== "no" && PageInfo !== "empty" ) 
                        ?
                        PageInfo.map((p)=>{
                            const o = btoa(String.fromCharCode(...new Uint8Array(p.org_pic.data.data)))
                            return (
                            <div className="flex p-2 justify-between border-t-gray-500 border-2  ">
                                <img src={`data:image/png;base64,${o}`} className="rounded-full h-14 shadow-xl mb-2" alt="user" />
                                <p className=" h-18 m-2 my-auto"  >{p.org_name}</p><br />
                                {
                                (PersonalInfo.pagefollow.includes(p._id)) ?
                                <button className="rounded cursor-pointer p-1 mb-3 border-4 border-cyan-500 hover:border-cyan-700 bg-white text-cyan-500 mt-3" disabled="true">followed</button> 
                                :
                                <button onClick={e => hello(p._id)} className="rounded cursor-pointer py-1 px-3 mb-3 border-4 border-white hover:border-cyan-700 bg-cyan-500 hover:bg-cyan-700 text-white mt-3">follow</button> 
                                }
                            </div>
                            )
                        })
                        :
                        (PageInfo === "no")
                        ?
                            "Not found"
                        :
                            "Search ...."
                    }
                    </div>
                </div>
                <Link to="/friends" ><li className="px-10 py-2 " title="Friends" ><PeopleSharpIcon fontSize="large" className='text-blue-500 hover:text-black target:bg-red-300'  /></li></Link>
                <Link to="/notifications" ><li className="px-10 py-2" title="Notification" ><NotificationsSharpIcon fontSize="large" className='text-blue-500 hover:text-black'  /></li></Link>
                <Link to="/jobs" ><li className="px-10 py-2" title="Jobs" ><WorkSharpIcon fontSize="large" className='text-blue-500 hover:text-black'  /></li></Link>
                <Link to="/profile" ><li className="px-10 py-2 " title="Me" ><PersonIcon fontSize="large" className='text-blue-500 hover:text-black'  /></li></Link>
                {/* <li className=" ml-64  px-10 py-4 text-white hover:bg-blue-600" >{props.navdata[3]}</li> */}
            </ul>
        </div>
        
        </>)
}
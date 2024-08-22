import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Conver from './Conver';
import Axios from 'axios';
import Chats from './Chats';
import {io} from 'socket.io-client'
import Send from '@mui/icons-material/Send';

export default function Chat() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext)
    const [con , setCon ] = useState([])
    const [ currentChat , setCurrentchat ] = useState(null)
    //const [ socket , setSocket ] = useState(null)
    const socket = useRef()
    const [ topic , setPic] =useState('')
    const [ messages ,setMessages] = useState('')
    const [ amessages ,setAmessages] = useState(null)
    const [ to ,setTo] = useState(null)
    const [ textm , setText] = useState('')

    useEffect(()=>{
        socket.current = io("ws://localhost:8900")
        socket.current.on("getMes",data=>{
            console.log(data)
            // setAmessages({
            //     sender : data.senderId,
            //     text : data.text,
            //     createdAt : Date.now()
            // })
        })
    },[])

    useEffect(()=>{
        currentChat &&
        alert(currentChat?.members.includes(amessages.sender))
        amessages && currentChat?.members.includes(amessages.sender) && 
        setMessages([...messages,amessages])
    },[amessages,currentChat]) 

    useEffect(()=>{
        socket.current.emit("addUser",user._id)
        socket.current.on("getUsers",users=>{
            console.log(users)
        })
    },[user])

    const getProfile = async (id) => {
        try {
            const data = await Axios.get("http://localhost:3001/getprofilepic/" + id)
            setPic([data.data])
        } catch (error) {
        }
    }

    useEffect(() => {
        if (user != null) {
            const getconversations = async () => {
                try {
                    const co = await Axios.get("http://localhost:3001/conversations/" + user._id)
                    setCon(co.data)
                } catch (error) {
        
                }
            }
            getconversations()
        }
        else {
            navigate('/')
        }
    }, [user])

    const getmsg = async (id) => {
        currentChat &&
        alert("id"+id)
        await getProfile(to)
        try {
            const msgs = await Axios.get("http://localhost:3001/message/" + id)
            setMessages(msgs.data)
        } catch (error) {

        }
    }

    const call = (a, b) => {
        console.log(a)
        setCurrentchat(a)
        setTo(b)
    }

    useEffect(() => {
        currentChat &&
        getmsg(currentChat._id)
    }, [currentChat])

    const send = async () =>{
    const m = {
        conversation : currentChat._id ,
        sender : user._id ,
        message : textm
    }

        socket.current .emit("sendMes",{
            senderId : user._id,
            receiverId : to,
            text : textm
        })
        try {
            const msgs = await Axios.post("http://localhost:3001/message" , m)
            setMessages([...messages, msgs.data])
            setText('')
        } catch (error) {

        }
    }

    return (
        <div className='py-4 bg-gray-300 h-screen'>
            <div className="w-3/12 bg-white fixed rounded-xl border-2 border-gray-300 font-semi">
                <div className='border-2 border-red-900 text-center rounded-xl font-bold m-2 p-2'>
                    Chat
                </div>
                {
                    con &&
                    con.map((x) => {
                        return (
                            x.members.map((y) => {
                                return (
                                    <>
                                        {
                                            (y != user._id)
                                                ?
                                                <div onClick={e => call(x, y)}>
                                                    <Conver conversation={y} />
                                                </div>
                                                :
                                                ""
                                        }
                                    </>
                                )
                            })
                        )
                    })
                }
            </div>
            <div className="w-6/12 px-5 mx-auto  ">
                <div className="shadow-md border-2  rounded-xl border-gray-500 shadow-gray-500 bg-white p-3 h-screen">
                    {
                        to 
                        ?
                        <>
                        <div className="p-6 border-2 rounded-t-xl border-gray-500 h-1/6">
                        {
                            topic &&
                            topic.map((d) => {
                                const image64 = btoa(String.fromCharCode(...new Uint8Array(d.profilepic.data.data)))
                                return (<div className="flex">
                                        <div><img src={`data:image/png;base64,${image64}`} alt="b" className="w-20 rounded-full" /></div>
                                        <div className="w-full ml-3 h-full my-auto p-2 rounded-lg">{d.user_name}</div>
                                    </div>)
                            })
                        }
                    </div>
                    <div className="border-2 rounded-b-xl border-gray-500 overflow-y-scroll h-4/6 ">
                        {
                            messages &&
                            messages.map((m) => {
                                return <Chats msg={m} toimg={topic} />
                            })
                        }
                    </div>
                    <div className=" flex m-2">
                    <input type="text" autoComplete='off' value={textm} onChange={e => setText(e.target.value)}  placeholder="Message" className=" my-auto px-3 py-3 border border-cyan-200 focus:outline-blue-700 rounded w-full mr-4 placeholder:text-gray-400 drop-shadow-lg" id='x' />
                    <button onClick={send}>
                        <Send className="" />
                    </button>
                    </div>
                    {
                        textm
                    }
                    </>
                    :
                    "select person from chat"
                }  
                </div>
            </div>
            <div className="w-3/12 rounded-xl bg-white fixed right-0 top-20 border-2 border-gray-300">...</div>
        </div>
    )
}
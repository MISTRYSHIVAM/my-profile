import React, { useState, useEffect, useContext } from 'react'
import Axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from "../context/AuthContext"
import Save from '@mui/icons-material/Bookmark';
import Profilephoto from '@mui/icons-material/AccountBox';
import Friendlogo from '@mui/icons-material/GroupAdd';
import Upload from '@mui/icons-material/Upload';
import Add from '@mui/icons-material/Add';
//import Chat from '@mui/icons-material/Chat';
import Leftprofilebar from '../components/Leftprofilebar';
import Post from '../components/Post';
// import Friend from '../components/Friend'
import img from '../images/project_logo.jpg'
import Backdrop from '@mui/material/Backdrop';
import { CircularProgress } from '@mui/material';
import Page_post from '../components/Page_post';

export default function Home() {
    const navigate = useNavigate();
    // const gotoPost = function () {
    //     navigate('/post')
    // }
    const { user } = useContext(AuthContext)
    const [isadmin, setAdmin] = useState('')
    const [postData, setPostdata] = useState([])
    const [profilepicData, setprofilepicdata] = useState([])
    const [newsData, setNews] = useState('')
    const [pagefollow, setPagefollow] = useState('')

    const news = async() =>{
        const d = await Axios.get("https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=3edfbd74c826438d81a606c3a59d387b")
        .then(res=>{
            setNews(res.data.articles);
        })
    }

    const requests = async () => {
        let posts = "http://localhost:3001/displayimage/";
        let profilepic = "http://localhost:3001/getprofilepic/";
        let personalinfo = "http://localhost:3001/get_page_follow/";

        const postsrequest = await Axios.get(posts + user._id)
        const profilepixrequest = await Axios.get(profilepic + user._id)
        const pinforequest = await Axios.get(personalinfo + user._id)

        Axios.all([postsrequest, profilepixrequest , pinforequest])
            .then(
                Axios.spread((...response) => {
                    if (response[0].status === 200) {
                        setPostdata(response[0].data);
                    }
                    if (response[1].status === 200) {
                        setprofilepicdata([response[1].data]);
                    }
                    // if (response[2].status === 200) {
                    //     console.log(response[2].data.pagefollow)
                    //     setPagefollow(response[2].data.pagefollow);
                    // }
                })
            )
    }
    const nav = (url) => {
        //alert(url)
        window.open(url)
    }


    useEffect(() => {
        if (user) {
            requests()
            setAdmin(user.isadmin)
            news()
        }
        else {
            navigate('/')
        }
    }, [user, navigate]);

    return (
        <>
            <div className="py-4 bg-gray-300">
                <div className="w-3/12 bg-white fixed rounded-xl border-2 border-gray-300 font-semi">
                    {
                        profilepicData.map((leftbar) => {
                            return (
                                <Leftprofilebar user={user.user_name} data={leftbar} />
                            )
                        })
                    }

                    <hr className="border border-gray-400" />
                    <Link to="/upprofilephoto"><p className="my-2 text-xl ml-1  text-blue-700 hover:underline"><Profilephoto fontSize="large" className="mr-1 bg-blue-700 text-white rounded-lg"></Profilephoto>change profile photo</p></Link>
                    <Link to="/friends" ><p className="mb-2 text-xl ml-1 text-blue-700 hover:underline"><Friendlogo fontSize="large" className="mr-2 bg-blue-700 text-white rounded-lg"></Friendlogo>make friends</p></Link>
                    <Link to="/post" ><p className="mb-2 text-xl ml-1 text-blue-700 hover:underline"><Upload fontSize="large" className="mr-2 bg-blue-700 text-white rounded-lg"></Upload>make post</p></Link>
                    <Link ><p className="mb-2 text-xl ml-1 text-blue-700 hover:underline"><Save fontSize="large" className="mr-2 bg-blue-700 text-white rounded-lg"></Save>saved post</p></Link>
                    {/* <Link to="/chatroom" ><p className="mb-2 text-xl ml-1 text-blue-700 hover:underline"><Chat fontSize="large" className="mr-2 bg-blue-700 text-white rounded-lg"></Chat>Chatroom</p></Link> */}
                    <hr className="border border-gray-400" />
                    {
                        (isadmin === "yes")
                            ?
                            <Link to="/admin" ><p className="m-2 text-xl ml-1 text-blue-700 hover:underline">company page</p></Link>
                            :
                            <Link to="/pagereg" ><p className="m-2 text-xl ml-1 text-blue-700 hover:underline"><Add fontSize="large" className="mr-2 bg-blue-700 text-white rounded-lg"></Add>create company page</p></Link>

                    }
                    {/* <p className="m-2 text-xl ml-1 text-blue-700 hover:underline">{isadmin}</p> */}
                    {/* <button className="rounded cursor-pointer ml-2 px-10 py-3 mb-3 border-4 border-white hover:border-cyan-700 bg-cyan-500 hover:bg-cyan-700 text-white mt-3" onClick={gotoPost} >POST</button> */}

                </div>
                <div className="w-6/12 px-5 mx-auto">
                    <div className="shadow-md rounded-xl border-2 border-gray-500 shadow-gray-500 bg-white py-1 ">
                        {
                            postData &&
                            postData.map((yo) => {
                                return (
                                    <Post postInfo={yo} like={yo.like.length} function={requests} />
                                )
                            })
                        }
                    </div>
                    {/* <div className="shadow-md rounded-xl border-2 border-gray-500 shadow-gray-500 bg-white py-1 ">
                        {
                            pagefollow &&
                            pagefollow.map((p)=>{
                                return(<>
                                    <Page_post page_id={p} />
                                </>)
                            })
                        }
                    </div> */}
                </div>
                <div className="w-3/12 rounded-xl bg-white fixed right-0 top-20 border-2 border-gray-300 overflow-y-scroll h-96">
                    <div className='border-2 border-red-900 text-center rounded-xl font-bold m-2 p-2'>
                        Daily business news
                    </div>
                    {
                        newsData &&
                            newsData.map((news) => {
                                return (
                                    <div className="p-1 cursor-pointer border-b-2 border-gray-500 mb-3" onClick={e => { nav(news.url) }} >
                                        <img src={news.urlToImage} className="w-32 rounded-md" />
                                        <div className="p-2">{news.title}</div>
                                    </div>
                                )
                            })
                            // :<>
                            // <Backdrop
                            //     sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            //     open
                            // ></Backdrop>
                            // <CircularProgress color="inherit" /></>
                    }
                </div>
                <div className="w-1/4  rounded-xl bg-white fixed right-0 bottom-40 border-2 border-gray-300 ">
                    <div>
                        <Link to="/about" >About</Link>
                    </div>
                    <div className="flex">
                        <img src={img} className="w-10" />My_profile © 2023
                    </div>
                </div>
            </div>

        </>
    )
}
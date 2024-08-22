import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import PublicIcon from '@mui/icons-material/Public';
import ReactTimeAgo from 'react-time-ago'

export default function Page_post(props) {
    const [page_post, setPagepost] = useState()

    const getPost = async () => {
        await Axios.get("http://localhost:3001/getpagepost/" + props.page_id)
            .then((res) => {
                setPagepost(res.data)
                //console.log(res.data)
            })
    }
    useEffect(() => {
        getPost()
    }, [])
    return (
        <div>
            {
                page_post &&
                page_post.map((da) => {
                    const base64 = btoa(String.fromCharCode(...new Uint8Array(da.post_pic.data.data)));
                    return (<div className="mx-4 my-1 border border-gray-400 rounded-lg" >
                        <div className='mx-auto my-3 flex items-center'>
                        <div className='w-1/1 px-5'></div>
                        <div className='w-1/2 px-5'>{da.org_name}</div>
                        <div className="w-1/2 float-right"><PublicIcon fontSize='small' /> : <ReactTimeAgo date={da.createdAt} locale="en-US" /></div>
                        </div>
                        <div className="w-3/4 mx-auto">
                            <p className="px-5 py-2">{da.description}</p>
                            <img src={`data:image/png;base64,${base64}`} className="w-11/12 mx-auto border-2 border-black" alt="post" />
                        </div>
                    </div>)
                })
            }
        </div>
    )
}

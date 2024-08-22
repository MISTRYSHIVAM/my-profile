import React from 'react'

export default function Leftprofilebar(props) {
    const profilepic = btoa(String.fromCharCode(...new Uint8Array(props.data.profilepic.data.data)))
    return (
        <div className="">
            <img src={`data:image/png;base64,${profilepic}`} className="rounded-full w-48 mx-auto shadow-xl m-2" alt="l" />
            <p className="w-full text-xl pl-3 my-2 py-2 bg-gray-200" align="center">- {props.user} -</p>
        </div>
    )
}

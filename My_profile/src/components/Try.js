import React from 'react'

export default function Try(props) {

    const image64 = btoa(String.fromCharCode(...new Uint8Array(props.image.data.data)));
    return (
        <div>
            hi may name is {props.name}
            <img src={`data:image/png;base64,${image64}`} className="rounded-full shadow-xl mb-2" alt="user" />
        </div>
  )
}

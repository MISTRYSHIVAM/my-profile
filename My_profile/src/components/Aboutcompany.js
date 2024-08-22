import React from 'react'
import logo from '../images/project_logo.jpg'

export default function Aboutcompany() {
    return (
        <div className="text-center">
            <img src={logo} className='w-32 rounded-xl ' />
            <h1 className="mb-2 text-black text-2xl text-center" >About My_profile - social media</h1>
            <h1 className="mb-10 text-black text-lg text-center" >Welcome to My_profile, the India's largest professional network with many
            <br />members from diffrent state of india.</h1>
            <h1 className="mb-2 text-black text-2xl text-center" >Vision</h1>
            <h1 className="mb-10 text-black text-lg text-center" >Create economic opportunity for every member of the global workforce.</h1>
            <h1 className="mb-2 text-black text-2xl text-center" >Mission</h1>
            <h1 className="mb-10 text-black text-lg text-center" >The mission of LinkedIn is simple: connect the world’s professionals<br /> to make them more productive and successful.</h1>
            <h1 className="mb-2 text-black text-2xl text-center" >Who are we?</h1>
            <h1 className="mb-2 text-black text-lg text-center" >My_profile began in co-founder Reid shivam's living room in 2023 and was officially launched on april 5, 2023.</h1>
        </div>
    )
}

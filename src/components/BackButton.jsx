import { useRouter } from 'next/navigation'
import React from 'react'

const BackButton = (props) => {
    const router = useRouter();
    return (
        <button onClick={()=>{router.back()}} className={`px-3 py-2 rounded-md ${props.class}  bg-[#4F39F6] border-2 cursor-pointer border-indigo-600 text-white font-semibold hover:scale-105 duration-200`}>
        Back
        </button>
    )
}

export default BackButton

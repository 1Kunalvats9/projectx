"use client"
import React, { useState,useEffect } from 'react'
import StoreIcon from './StoreIcon'
import { useRouter } from 'next/navigation'

const Navbar = () => {
    const router = useRouter()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [color, setColor] = useState("")
    const [logText, setLogText] = useState("")
    useEffect(() => {
      const token = localStorage.getItem("token");
      if(!token){
        setIsLoggedIn(false)
        setColor("bg-[#5046E5]")
        setLogText('Login')
      }else{
        setIsLoggedIn(true)
        setColor("bg-red-500")
        setLogText('Logout')
      }
    }, []);
  const logout=()=>{
    localStorage.removeItem("token")
    router.push("/login")
  }
  return (
    <nav className='w-[100vw] fixed top-0 h-[4rem] md:h-[5rem] bg-white shadow-sm flex justify-between items-center py-5 md:py-10 px-10 md:px-40'>
      <div className='flex items-center gap-3'>
        <StoreIcon />
        <h1 className='text-xl md:text-2xl font-bold'>ShopManager</h1>
      </div>
      <div>
        <button onClick={logout} className={`cursor-pointer text-bold text-lg md:text-2xl px-2 py-1 md:px-4 md:py-2 ${color} text-white rounded-lg md:rounded-xl`}>{logText}</button>
      </div>
    </nav>
  )
}

export default Navbar

"use client"
import React, { useState,useEffect } from 'react'
import StoreIcon from './StoreIcon'
import { useRouter } from 'next/navigation'

const Navbar = () => {
    const router = useRouter()
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [name, setName] = useState("")

    useEffect(() => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token); // Converts token existence to a boolean
      
    }, [isLoggedIn]);

    const handleLogout = () => {
      localStorage.removeItem("token"); // Remove token
      setIsLoggedIn(false); // Update state
      router.push("/login"); // Redirect to login page
    };
  return (
    <nav className='w-[100vw] h-[4rem] md:h-[5rem] bg-white shadow-sm flex justify-between items-center py-3 md:py-6 px-4 md:px-40'>
      <div className='flex items-center gap-3 cursor-pointer' onClick={()=>{router.push('/dashboard')}}>
        <StoreIcon />
        <h1 className='text-xl md:text-2xl font-bold'>ShopManager</h1>
      </div>
      <div>
        {isLoggedIn ?  <div className='flex gap-6 items-center text-gray-600'>
          <h1>Welcome!{name}</h1>
          <a onClick={handleLogout} className='hover:text-red-500 hover:duration-200' href="/login">Logout</a>
        </div> :  <button onClick={()=>{router.push("/login")}} className={`cursor-pointer text-bold text-lg md:text-xl px-2 py-1 md:px-3 md:py-2 bg-indigo-600 text-white rounded-lg md:rounded-lg`}>Login</button>}
      </div>
    </nav>
  )
}

export default Navbar

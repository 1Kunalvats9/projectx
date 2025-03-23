"use client"
import React, { useState,useEffect } from 'react'
import StoreIcon from './StoreIcon'
import { useRouter } from 'next/navigation'

const Navbar = () => {
    const router = useRouter()
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [name, setName] = useState("Ramji")

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
    <nav className='w-[100vw] fixed top-0 h-[4rem] md:h-[5rem] bg-white shadow-sm flex justify-between items-center py-5 md:py-10 px-10 md:px-40'>
      <div className='flex items-center gap-3'>
        <StoreIcon />
        <h1 className='text-xl md:text-2xl font-bold'>ShopManager</h1>
      </div>
      <div>
        {isLoggedIn ?  <div className='flex gap-6 items-center text-gray-600'>
          <h1>Hello, {name}</h1>
          <a onClick={handleLogout} href="/login">Logout</a>
        </div> :  <button onClick={()=>{router.push("/login")}} className={`cursor-pointer text-bold text-lg md:text-2xl px-2 py-1 md:px-4 md:py-2 bg-indigo-600 text-white rounded-lg md:rounded-xl`}>Login</button>}
      </div>
    </nav>
  )
}

export default Navbar

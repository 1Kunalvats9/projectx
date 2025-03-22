"use client"

import React, { useState } from 'react'
import StoreIcon from './StoreIcon'

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <nav className='w-[100vw] fixed top-0 h-[4rem] md:h-[5rem] bg-white shadow-sm flex justify-between items-center py-5 md:py-10 px-10 md:px-40'>
      <div className='flex items-center gap-3'>
        <StoreIcon />
        <h1 className='text-xl md:text-2xl font-bold'>ShopManager</h1>
      </div>
      <div>
        {isLoggedIn ? <button className='cursor-pointer text-bold text-lg md:text-2xl px-2 py-1 md:px-4 md:py-2 bg-red-500 text-white rounded-lg md:rounded-xl'>Logout</button>: <button className='cursor-pointer text-bold text-xl md:text-2xl px-2 py-1 md:px-4 md:py-2 bg-[#5046E5] text-white rounded-lg md:rounded-xl'><a href="/login">Login</a></button>}
      </div>
    </nav>
  )
}

export default Navbar

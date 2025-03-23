"use client"
import Login from '@/components/Login'
import Navbar from '@/components/Navbar'
import React from 'react'

const page = () => {
  return (
    <div className='w-full h-[100vh] flex items-center justify-center'>
      <Navbar />
      <Login />
    </div>
  )
}

export default page

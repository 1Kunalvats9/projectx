"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  return (
    <div className='grid place-items-center h-screen'>
      <div className='shadow-lg p-5 rounded-3xl border-t-4 border-[#5046E5]'>
        <h1 className='text-xl font-bold my-4'>Register</h1>
        <form className='flex flex-col gap-3' onSubmit={async (e) => {
          e.preventDefault()
          try {
            const res = await fetch("api/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email,
                password,
              }),
            });

            if (res.ok) {
              const form = e.target;
              form.reset();
              router.push("/login")
              
            } else {
              console.log("User registration failed.");
            }
          } catch (err) {
            console.log("error: ", err)
          }
        }}>
          <input type="text" placeholder='Email' onChange={(e) => {
            setEmail(e.target.value)
          }} className='outline-none w-full' />
          <input type="password" placeholder='Password' onChange={(e) => {
            setPassword(e.target.value)
          }}  className='outline-none w-full'/>
          <button className='bg-[#5046E5] text-white rounded-lg cursor-pointer font-bold px-6 py-2'>Register</button>
          <Link className='text-sm mt-3 text-right' href={"/login"}>Already have an account ? <span className='underline'>Login</span></Link>
        </form>
      </div>
    </div>
  )
}

export default Register

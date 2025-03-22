"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  return (
    <div className='grid place-items-center h-screen'>
      <div className='shadow-lg p-5 rounded-3xl border-t-4 border-[#5046E5]'>
        <h1 className='text-xl font-bold my-4'>Login</h1>
        <form className='flex flex-col gap-3' onSubmit={async (e) => {
          e.preventDefault()
          try {
            const res = await fetch("/api/login", {
              method: "POST",
              body: JSON.stringify({ email, password }),
              headers: { "Content-Type": "application/json" },
            });

            const data = await res.json();

            if (res.ok) {
              localStorage.setItem("token", data.token); // Store token
              router.push("/dashboard"); // Redirect
            } else {
              alert(data.message);
            }
          } catch (err) {
            console.error("Error:", err);
          }
        }}>
          <input type="text" placeholder='Email' onChange={(e) => {
            setEmail(e.target.value)
          }} />
          <input type="password" placeholder='Password' onChange={(e) => {
            setPassword(e.target.value)
          }} />
          <button className='bg-[#5046E5] text-white rounded-lg cursor-pointer font-bold px-6 py-2'>Login</button>
          <Link className='text-sm mt-3 text-right' href={"/register"}>Don't have an account ? <span className='underline'>Register</span></Link>
        </form>
      </div>
    </div>
  )
}

export default Login

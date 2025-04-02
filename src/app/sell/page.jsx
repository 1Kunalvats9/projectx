"use client"

import Navbar from '@/components/Navbar'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [isSearching, setisSearching] = useState(false)
    const [searchFor, setsearchFor] = useState("")
    const [products, setProducts] = useState([])
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
        }
        const email = localStorage.getItem('email')
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/inventoryget", {
                    method: "POST",
                    body: JSON.stringify({ email }),
                    headers: { "Content-Type": "application/json" },
                });
                if (!res.ok) throw new Error("Failed to fetch products");
                const data = await res.json();
                setProducts(data.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, [])
    return (
        <div className='w-[100vw] min-h-[100vh] flex flex-col items-center justify-start'>

            <div className='w-full min-h-[94vh] px-10 py-5 '>
                <div className="overflow-x-scroll">
                    <div className="w-full flex items-center justify-start flex-col">
                        <input onClick={() => setisSearching(!isSearching)} type="text" placeholder="Search for products" className={`w-full mt-5 border-2 border-gray-100 rounded-md px-5 py-2 outline-none`} onChange={(e) => { setsearchFor(e.target.value) }} />
                    </div>
                    <div className='w-full border-2 mt-10 rounded-lg border-gray-100 flex flex-wrap gap-5 px-8 py-3'>
                        {
                            !isSearching && searchFor.length!=0 ?
                                products.map((item, idx) => {
                                    return (
                                        <div className='flex flex-col justify-center w-[15rem] min-h-[20rem] border-2 border-gray-100 rounded-lg' key={item._id}>
                                            <img src={item.url} alt="Product image" className='rounded-lg h-[180px] w-auto object-cover' />
                                            <div className='flex items-start flex-col justify-start gap-4 px-4 py-2'>
                                                <h1><span className='font-semibold'>Product: </span>{item.name}</h1>
                                                <h1><span className='font-semibold'>Category: </span>{item.category}</h1>
                                                <h1><span className='font-semibold'>Quantity: </span>{item.quantity}</h1>
                                                <h1><span className='font-semibold'>Price: </span>₹{item.retailPrice}</h1>
                                            </div>
                                        </div>
                                    )
                                }) :
                                products
                                    .filter(ele => ele.name?.toLowerCase().startsWith(searchFor.toLowerCase()))
                                    .map((item, idx) => (
                                        <div className='flex flex-col w-[19rem] min-h-[20rem] border-2 border-gray-100 rounded-lg' key={item._id}>
                                            <img src={item.url} alt="Product image" className='rounded-lg h-[180px] w-auto object-contain' />
                                            <div className='flex items-start flex-col justify-start gap-4 px-4 py-2'>
                                                <h1><span className='font-semibold'>Product: </span>{item.name}</h1>
                                                <h1><span className='font-semibold'>Category: </span>{item.category}</h1>
                                                <h1><span className='font-semibold'>Quantity: </span>{item.quantity}</h1>
                                                <h1><span className='font-semibold'>Price: </span>₹{item.retailPrice}</h1>
                                                <div className=' flex gap-3 items-center'>
                                                    <input type="number" placeholder='Amount' className='border-2 w-24 border-gray-100 rounded-md px-2 py-1' />
                                                    <button className='bg-green-500 hover:bg-green-600 rounded-md cursor-pointer px-2 py-1 text-white'>Add to Cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                        }
                    </div>
                    {products && products.length === 0 && <p className="text-gray-500 mt-4">No products found.</p>}
                </div>
            </div>
        </div>
    )
}

export default page




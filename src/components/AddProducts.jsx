"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import BackButton from './BackButton';

const AddProducts = () => {
    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [quantity, setQuantity] = useState(0)
    const [retailPrice, setRetailPrice] = useState(0)
    const [wholesalePrice, setWholesalePrice] = useState(0)
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("")
    const [url, setUrl] = useState("")
    const router = useRouter()
    const handleUpload = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        setUrl(data.url);
        console.log("Uploaded URL:", data.url);
    };
    const handleClick = async (e) => {
        e.preventDefault();
        if (!url) {
            alert("Image is still uploading, please wait.");
            return;
        }

        try {
            const email = localStorage.getItem("email");
            const res = await fetch("/api/inventoryput", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, name, category, quantity, retailPrice, wholesalePrice, url }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Failed to add product");
            }

            const data = await res.json();
            toast.success("Product added Successfully ✅"); // ✅ Moved before navigation
            setTimeout(() => {
                router.push("/dashboard");
            }, 1000); 
            console.log("✅ Product added successfully:", data);
        } catch (err) {
            console.error("❌ Error adding product:", err.message);
        }
    };

    return (
        <div className="bg-white rounded-lg border-2 border-gray-300 p-6 max-w-md w-full">
            <BackButton class="top-8 left-4 absolute" />
            <h3 className="text-xl md:text-3xl font-medium text-white bg-indigo-700 px-3 py-2 rounded-md mb-4">Add New Product</h3>
            <form onSubmit={handleClick}>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-md font-medium text-gray-700">Product Name</label>
                        <input type="text" id="name" placeholder='Name' className="mt-1 block w-full rounded-sm border-2 border-gray-300 focus:border-2 focus:border-indigo-500 focus:ring-indigo-500 outline-none px-3 py-1" onChange={(e) => { setName(e.target.value) }} />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                        <select id="category" className="mt-1 focus:border-2 block w-full rounded-sm border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 outline-none px-3 py-1" onChange={(e) => { setCategory(e.target.value); }} >
                            <option value="Furniture">Furniture</option>
                            <option value="Snacks">Snacks</option>
                            <option value="Home and Kitchen">Home and Kitchen</option>
                            <option value="Groceries">Groceries</option>
                            <option value="Food">Food</option>
                            <option value="Dessert">Dessert</option>
                            <option value="Clothes">Clothes</option>
                            <option value="Dairy">Dairy</option>
                            <option value="Electronics">Electronics</option>
                        </select>

                    </div>
                    <div>
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                        <input type="number" id="quantity" placeholder='Quantity' className="mt-1 focus:border-2 block w-full rounded-sm border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 outline-none px-3 py-1" onChange={(e) => { setQuantity(e.target.value); }} />
                    </div>
                    <div>
                        <label htmlFor="retailPrice" className="block text-sm font-medium text-gray-700">Retail Price (₹)</label>
                        <input type="number" id="retailPrice" placeholder='Retail price' className="mt-1 focus:border-2 block w-full rounded-sm border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 outline-none px-3 py-1" onChange={(e) => { setRetailPrice(e.target.value); }} />
                    </div>
                    <div>
                        <label htmlFor="wholesalePrice" className="block text-sm font-medium text-gray-700">Wholesale Price (₹)</label>
                        <input type="number" id="wholesalePrice" placeholder='Wholesale Price' className="mt-1 focus:border-2 block w-full rounded-sm border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 outline-none px-3 py-1"
                            onChange={(e) => { setWholesalePrice(e.target.value); }} />
                    </div>
                    <div>
                        <input type="file" placeholder='Upload Image' className='px-3 py-1 border-2 rounded-md w-full border-gray-200' onChange={handleUpload} />
                    </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                    <button type="button" className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50" onClick={() => {
                        router.push("/dashboard")
                    }}>Cancel</button>
                    <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">Add Product</button>
                </div>
            </form>
        </div>
    );
};

export default AddProducts;
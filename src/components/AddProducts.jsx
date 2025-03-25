"use client"
import React, { useState } from 'react';

const AddProducts = () => {
    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [quantity, setQuantity] = useState(0)
    const [retailPrice, setRetailPrice] = useState(0)
    const [wholesalePrice, setWholesalePrice] = useState(0)
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleClick = async () => {
        setError(""); // Reset previous errors
        setSuccess(""); // Reset success message
        const email = localStorage.getItem("email")
        try {
            const res = await fetch("/api/inventoryput", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, name, category, quantity, retailPrice, wholesalePrice }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Failed to add product");
            }

            const data = await res.json();
            setSuccess(data.message);
            console.log("✅ Product added successfully:", data);
        } catch (err) {
            console.error("❌ Error adding product:", err.message);
            setError(err.message || "Something went wrong. Please try again.");
        }
    };
    
    return (
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Product</h3>
            <form>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
                        <input type="text" id="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" onChange={(e)=>{setName(e.target.value)}} />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                        <input id="category" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" onChange={(e)=>{setCategory(e.target.value);}} />

                    </div>
                    <div>
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                        <input type="number" id="quantity" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" onChange={(e)=>{setQuantity(e.target.value);}} />
                    </div>
                    <div>
                        <label htmlFor="retailPrice" className="block text-sm font-medium text-gray-700">Retail Price (₹)</label>
                        <input type="number" id="retailPrice" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" onChange={(e)=>{setRetailPrice(e.target.value);}}/>
                    </div>
                    <div>
                        <label htmlFor="wholesalePrice" className="block text-sm font-medium text-gray-700">Wholesale Price (₹)</label>
                        <input type="number" id="wholesalePrice" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        onChange={(e)=>{setWholesalePrice(e.target.value);}} />
                    </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                    <button type="button" className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                    <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700" onClick={handleClick}>Add Product</button>
                </div>
            </form>
        </div>
    );
};

export default AddProducts;
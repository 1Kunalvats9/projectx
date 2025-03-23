"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Page = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login"); // Redirect to login if token is missing
    } else {
      setUser({ loggedIn: true });
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/inventoryget"); // ✅ Ensure correct API path
        if (!res.ok) throw new Error("Failed to fetch products");
  
        const data = await res.json();
        setProducts(data.data[0].products); // ✅ Correctly set state
      } catch (error) {
        console.error(error);
        alert("Error fetching details");
      }
    };
  
    fetchProducts(); // Call the function
  }, []); // ✅ Dependency array

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mt-[4rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white rounded-lg shadow px-5 py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package h-6 w-6 text-indigo-600">
                  <path d="m7.5 4.27 9 5.15"></path>
                  <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
                  <path d="m3.3 7 8.7 5 8.7-5"></path>
                  <path d="M12 22V12"></path>
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1"><dl><dt className="text-sm font-medium text-gray-500 truncate">Total Products</dt><dd className="text-lg font-semibold text-gray-900">156</dd></dl>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow px-5 py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users h-6 w-6 text-green-600"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <div className="ml-5 w-0 flex-1"><dl><dt className="text-sm font-medium text-gray-500 truncate">Daily Customers</dt><dd className="text-lg font-semibold text-gray-900">28</dd></dl>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow px-5 py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bar-chart3 h-6 w-6 text-blue-600"><path d="M3 3v18h18"></path><path d="M18 17V9"></path><path d="M13 17V5"></path><path d="M8 17v-3"></path></svg>
              </div>
              <div className="ml-5 w-0 flex-1"><dl><dt className="text-sm font-medium text-gray-500 truncate">Monthly Sales</dt><dd className="text-lg font-semibold text-gray-900">45,256</dd></dl>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow px-5 py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-dollar-sign h-6 w-6 text-yellow-600"><line x1="12" x2="12" y1="2" y2="22"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              </div>
              <div className="ml-5 w-0 flex-1"><dl><dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt><dd className="text-lg font-semibold text-gray-900">12,342</dd></dl>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-5 bg-white mt-6 rounded-xl sm:p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">Product Management</h3>
          <button onClick={()=>{router.push("/test")}} className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus h-5 w-5 mr-2"><path d="M5 12h14"></path><path d="M12 5v14"></path>
            </svg>Add Product</button></div>
          <div className="overflow-x-scroll">
            <table className="min-w-full divide-y mt-6 divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Retail Price</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wholesale Price</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-black">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${item.retailPrice}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${item.wholesalePrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {products.length === 0 && <p className="text-gray-500 mt-4">No products found.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

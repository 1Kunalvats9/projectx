"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login"); // Redirect to login if token is missing
    } else {
      setUser({ loggedIn: true });
    }
  }, []);

  return user ? <h1 className="absolute top-[20vh] left-[20vw]">Welcome to Dashboard</h1> : <p>Loading...</p>;
};

export default page;
'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "./layout";
import { useUser } from "@/context/UserContext";

export default function Page() {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      router.push("/chatbot");
    }
  }, [router, user]);

  const handleSignIn = () => {
    // Simulate user sign-in and set user
    const user = email; // In a real application, you would verify the email and password
    setUser(user);
    localStorage.setItem("user", user);
    router.push("/chatbot");
  };

  if (user) {
    return null; // or a loading spinner
  }

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1>At Cost AI</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-2 p-2 w-52 bg-transparent border-none border-b-2 border-gray-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-5 p-2 w-52 bg-transparent border-none border-b-2 border-gray-500"
        />
        <button onClick={handleSignIn} className="p-2 bg-blue-500 text-white rounded">Sign In</button>
      </div>
    </Layout>
  );
}

import React, { useState } from "react";
import BackgroundImg from "../components/BackgroundImg";
import Header from "../components/Header";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../utilis/Firebase-config";

const Login = () => {
  const [email, setEmail] = useState("guest@gmail.com");
  const [password, setPassword] = useState("88888888");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log(error.code);
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) window.location.href = "/splash";
  });
  return (
    <div className="relative text-white">
      <BackgroundImg />
      <div className="absolute top-0 left-0 h-screen w-screen bg-[rgba(0.0.0.0.7) grid-cols-[15vh,86vh]">
        <Header />
        <div className="flex flex-col items-center justify-center gap-8 h-[85vh]">
          <div className="flex flex-col items-center justify-center p-8 bg-[#000000b0] gap-8 text-white ">
            <div className="">
              <h1>login</h1>
            </div>
            <div className="relative flex flex-col gap-8 ">
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-60 px-4 py-2 text-black"
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-60 px-4 py-2 text-black"
              />
              <button
                className="py-2 px-8 bg-[#e50914] hover:bg-red-500 border-none text-white rounded-md font-bold text-base"
                onClick={handleLogin}
              >
                Login to your account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

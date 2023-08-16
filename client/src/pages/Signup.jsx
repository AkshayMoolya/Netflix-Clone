import React, { useState } from "react";
import BackgroundImg from "../components/BackgroundImg";
import Header from "../components/Header";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseAuth } from "../utilis/Firebase-config";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = async () => {
    try {
      const { email, password } = formValues;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log(error);
    }

    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        window.location.href = "/splash";
      }
    });
  };

  return (
    <div className="relative text-white">
      <BackgroundImg />
      <div className="absolute top-0 left-0 bg-[rgba(0,0,0,0.6)] h-screen w-screen grid grid-rows-[15vh,85vh]">
        <Header login />
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex flex-col gap-3 sm:gap-7 text-center items-center">
            <h1 className="text-xl font-bold py-0  sm:text-6xl sm:w-4/6">
              Unlimited movies, TV shows and more
            </h1>
            <h4 className="text-lg font-bold sm:text-3xl">
              Watch anywhere. Cancel anytime
            </h4>
            <h6 className="text-sm font-semibold sm:text-xl">
              Ready to Watch? Enter email to create or restart yor membership
            </h6>
          </div>
          <div
            className={`grid w-80 sm:w-7/12  ${
              showPassword ? "grid-cols-2" : "grid-cols-[2fr,1fr]"
            }`}
          >
            <input
              className="text-black p-3 sm:p-6 text-sm border-2 border-solid border-black focus:outline-none "
              type="email"
              placeholder="Email Address"
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
              name="email"
              value={formValues.email}
            />
            {showPassword && (
              <input
                className="text-black p-3 sm:p-6 text-sm border-2 border-solid border-black focus:outline-none "
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
                name="password"
                value={formValues.password}
              />
            )}

            {!showPassword && (
              <button
                onClick={() => setShowPassword(true)}
                className=" rounded-md py-2 bg-[#e50914] border-none text-white font-bold text-lg"
              >
                Get Started
              </button>
            )}
          </div>
          <button
            onClick={handleSignIn}
            className="px-4 py-2 bg-[#e50914] border-none text-white rounded-md font-bold text-lg"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;

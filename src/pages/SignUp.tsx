import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserSignUpMutation } from "../app/redux/features/auth/authApi";
import toast from 'react-hot-toast'

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [userSignUp, { error , isSuccess}] = useUserSignUpMutation();

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      name: { firstName, lastName },
      phoneNumber,
      password,
    };
    userSignUp(data);
  };

if(isSuccess){
  toast.success('Successfully created!',{id:'signup'});
  navigate('/auth/signin')
}

if (error) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errorMessage = (error as any).data?.message || "An error occurred";
  toast.error(errorMessage, { id: "signup" });
}

  return (
    <div className="py-6 2xl:px-6">
      <div className="container">
        <div className="p-8 overflow-hidden bg-white shadow rounded-md max-w-xl mx-auto">
          <h4 className="mb-8 text-xl font-bold text-center">Sign Up</h4>
          <form className="auth-form space-y-2" onSubmit={handleSignUp}>
            <div className="space-y-2">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="text-input min-h-[40px]"
                id="firstName"
                name="firstName"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="text-input min-h-[40px]"
                id="lastName"
                name="lastName"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="text-input min-h-[40px]"
                id="phoneNumber"
                name="phoneNumber"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-input min-h-[40px]"
                id="password"
                name="password"
              />
            </div>

            <button type="submit" className="submit" id="submit">
              Sign Up
            </button>
            <p>Already have an account ? please <Link to='/auth/signin' className="text-purple-500">Signin</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

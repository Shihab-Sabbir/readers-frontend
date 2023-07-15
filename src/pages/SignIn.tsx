import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast'
import { useUserSignInMutation } from "../app/redux/features/auth/authApi";

function SignIn() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [userSignIn, {data, error , isSuccess}] = useUserSignInMutation();

  const handleSignIn = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      phoneNumber,
      password
    }
    userSignIn(data)
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Successfully signin!', { id: 'signin' });
      console.log('cookie : ', document.cookie);
      localStorage.setItem('readers-current-user', JSON.stringify(data?.data?.accessToken));
      navigate('/')
    }
  }, [isSuccess, data, navigate]);
  
  useEffect(() => {
    if (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorMessage = (error as any).data?.message || "An error occurred";
      toast.error(errorMessage, { id: "signin" });
    }
  }, [error])
  

  return (
    <div className="py-6 2xl:px-6">
      <div className="container">
        <div className="p-8 overflow-hidden bg-white shadow-cardShadow rounded-md max-w-xl mx-auto">
          <h4 className="mb-8 text-xl font-bold text-center">Sign In</h4>
          <form className="auth-form space-y-2" onSubmit={handleSignIn}>
            <div className="space-y-2">
              <label htmlFor="phoneNumber">PhoneNumber</label>
              <input
                type="phoneNumber"
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
              Sign In
            </button>
            <p>No account ? please <Link to='/auth/signup' className="text-purple-500">Signup</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
}


export default SignIn;

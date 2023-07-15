import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { useAppDispatch } from "./app/redux/hooks/hooks";
import { loginReducer } from "./app/redux/features/auth/authSlice";
function App(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const tokenString = localStorage.getItem("readers-current-user");
    const authInfo = tokenString ? JSON.parse(tokenString) : null;
    if (authInfo) {
      dispatch(loginReducer(authInfo));
    }
  }, [dispatch]);

  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
    </div>
  );
}

export default App;

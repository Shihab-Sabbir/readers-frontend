import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import './App.css'
import { Toaster } from "react-hot-toast";
function App(): JSX.Element {
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
    </div>
  );
}

export default App;

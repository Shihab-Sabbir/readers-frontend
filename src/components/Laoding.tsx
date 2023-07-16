import React from "react";

function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-64 p-4">
        <p className="text-xl font-bold pb-2">Loading....</p>
        <div className="animate-pulse">
          <div className="bg-purple-400 h-4 w-full mb-2 rounded"></div>
          <div className="bg-purple-400 h-4 w-full mb-2 rounded"></div>
          <div className="bg-purple-400 h-4 w-full mb-2 rounded"></div>
        </div>
      </div>
    </div>
  );
}

export default Loading;

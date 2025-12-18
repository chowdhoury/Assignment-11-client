import React from "react";

const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center z-10 bg-white">
      <span className="loading loading-ring loading-xl text-primary"></span>
    </div>
  );
};

export default Loading;

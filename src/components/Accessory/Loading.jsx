import React from "react";
import { ThreeCircles } from "react-loader-spinner";
function Loading() {
  return (
    <div
      className="loading"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <ThreeCircles color="#008FFB" size={100} />
    </div>
  );
}

export default Loading;

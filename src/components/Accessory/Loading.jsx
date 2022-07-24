import React from "react";
import LoadingGif from "../../img/loading.gif";

function Loading() {
  return (
    <div
      className="loading"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: "1",
        backgroundColor: "#000",
      }}
    >
      <img src={LoadingGif} alt="loading" />
    </div>
  );
}

export default Loading;

import React from "react";
import loading from "../assets/loading.svg";
function Loading() {
  return (
    <div className="empty__notes__ilusttration">
      <div className="empty__note__wrapper">
        <img src={loading} alt="empty__notes" />
        <span>Loading</span>
      </div>
    </div>
  );
}

export default Loading;

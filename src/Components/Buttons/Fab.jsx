import React from "react";
import AddIcon from "@material-ui/icons/Add";

function Fab({ onClick }) {
  const createRipple = (e) => {
    onClick && onClick();
    let x = e.clientX - e.target.offsetLeft;
    let y = e.clientY - e.target.offsetTop;
    const ripple = document.createElement("span");
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    e.target.appendChild(ripple);

    setInterval(() => {
      ripple.remove();
    }, 1000);
  };
  return (
    <button className="fab fab__primary" onClick={createRipple}>
      <AddIcon />
    </button>
  );
}

export default Fab;

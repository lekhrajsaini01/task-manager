import React from "react";

function IconButton({ children, onClick }) {
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
    <div className="icon-button" onClick={createRipple}>
      {children}
    </div>
  );
}

export default IconButton;

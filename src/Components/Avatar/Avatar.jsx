import React from "react";

function Avatar({ children, src, alt, color, size }) {
  const createRipple = (e) => {
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
    <div
      className={`avatar ${color + "__avatar"} ${size + "__avatar"}`}
      onClick={!src && createRipple}
    >
      {src ? (
        <img src={src} alt={alt ? alt : "Material Avatar Image"} />
      ) : (
        children
      )}
    </div>
  );
}

export default Avatar;

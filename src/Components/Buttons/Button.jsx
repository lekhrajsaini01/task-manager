import React from "react";

function Button({
  variant,
  color,
  disabled,
  disableElevation,
  children,
  onClick,
  size,
  position,
}) {
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
    <button
      className={`button ${variant + "__button"} ${
        color + "__" + variant + "__button"
      } ${disableElevation ? "disableElevation__button" : "null"}
      
      ${size && size + "__button"} 
      ${position && position + "__button"}`}
      disabled={disabled}
      onClick={createRipple}
    >
      {children}
    </button>
  );
}

export default Button;

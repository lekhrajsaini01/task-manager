import React from "react";
import Button from "./Buttons/Button";

function Snakbar({
  onClick,
  snackbar,
  message,
  color,
  handleAutoClose,
  direction,
}) {
  snackbar && handleAutoClose();
  return (
    <div
      className={`snakbar ${snackbar && "snackbar__enabled"} ${
        color + "__snackbar"
      } ${direction + "__snackbar"}`}
    >
      <p className="snackbar__message">{message}</p>
      <Button
        variant="text"
        color={color === "secondary" ? "primary" : "secondary"}
        disableElevation
        onClick={onClick}
        size="small"
      >
        Undo
      </Button>
    </div>
  );
}

export default Snakbar;

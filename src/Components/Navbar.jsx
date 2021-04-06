import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import Avatar from "./Avatar/Avatar";
import { IconButton } from "@material-ui/core";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import { useStateValue } from "../StateProvider";
import ClearIcon from "@material-ui/icons/Clear";

function Navbar() {
  const [isDark, setDark] = React.useState(false);
  const [{ isSearch }, dispatch] = useStateValue();

  const handleLightTheme = () => {
    setDark(false);
    const body = document.body;
    body.classList.remove("dark-theme");
  };

  const handleDarkTheme = () => {
    setDark(true);
    const body = document.body;
    body.classList.remove("light-theme");
    body.classList.add("dark-theme");
  };

  const handleSearch = () => {
    dispatch({
      type: "SET_SEARCH",
      isSearch: !isSearch,
    });
  };
  return (
    <div className="navbar">
      <div className="navbar__wrapper">
        <div className="navbar__brand">
          <span>Task Manager</span>
        </div>
        <div className="navbar__right">
          <IconButton onClick={handleSearch}>
            {!isSearch ? <SearchIcon /> : <ClearIcon />}
          </IconButton>
          <IconButton onClick={isDark ? handleLightTheme : handleDarkTheme}>
            {isDark ? <Brightness4Icon /> : <WbSunnyIcon />}
          </IconButton>
          <Avatar color="link" size="small">
            S
          </Avatar>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

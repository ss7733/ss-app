import { Link } from "react-router-dom";
import Logo from "../imgs/ss-icon.png";
import React from "react";
const Nav = () => {
  return (
    <div className="Nav">
      <img alt="" src={Logo} />
      <div className="List">
        <Link to="/ss-app">Home</Link>
        <div>/</div>
        <Link to="/ss-app/Experience">Experience</Link>
        <div>/</div>
        <Link to="/ss-app/Portfolio">Portfolio</Link>
      </div>
    </div>
  );
};

export default Nav;

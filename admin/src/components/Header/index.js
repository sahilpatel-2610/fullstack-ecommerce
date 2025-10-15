import React, { useContext } from "react";
import SearchBox from "../SearchBox";
import UserAvatar from "../UserAvatarImg";
import { MyContext } from "../../App";   // ✅ sahi path
import { FaBell, FaEnvelope, FaShoppingCart } from "react-icons/fa";

const Header = () => {
  const context = useContext(MyContext);

  return (
    <div className="header d-flex align-items-center justify-content-between px-4 shadow-sm">
      <div className="logo fw-bold fs-4">HOTASH</div>

      <SearchBox />

      <div className="icons d-flex align-items-center gap-4">
        <FaShoppingCart className="icon" />
        <FaEnvelope className="icon" />
        <FaBell className="icon" />
        <UserAvatar />
      </div>
    </div>
  );
};

export default Header;
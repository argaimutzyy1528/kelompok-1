import React from 'react';
import { FaUser } from "react-icons/fa";

const Header = () => {
  return (
    <div className="header">
      <div className="user-profile">
        <span><FaUser /></span>
        <span>Admin</span>
        
      </div>
    </div>
  );
};

export default Header;
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1>Roadside Service</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/service-request">Request Service</Link></li>
          <li><Link to="/account">Account</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header.jsx";
import Home from "./pages/Home.jsx"; // Your Home page component
import ServiceRequest from "./pages/ServiceRequest.jsx"; // Your Service Request page component
import Account from "./pages/Account.jsx"; // Your Account page component
import Login from "./pages/Login.jsx"; // Your Login page component
import Contact from "./pages/Contact.jsx"; // Your Contact page component

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/service-request" element={<ServiceRequest />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;

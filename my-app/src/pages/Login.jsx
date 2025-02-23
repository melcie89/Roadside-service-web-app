import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Here you would typically call an API to log the user in
  };

  return (
    <div className="login-page">

      <main>
        <section id="login-form">
          <h2>Sign In</h2>
          <form onSubmit={handleSubmit} id="loginForm">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button type="submit">Login</button>
          </form>
          <p>Don't have an account? <Link to="/account">Create one here</Link>.</p>
        </section>
      </main>

      <footer>
        <p>&copy; 2025 Roadside Assistance. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Login;

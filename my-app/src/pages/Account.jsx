import React, { useState } from 'react';
const API_URL = import.meta.env.VITE_API_URL;

function Account() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user', // default to 'user'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the form data to send in the request
    const { name, email, password, role } = formData;
    const userData = { name, email, password, role };

    try {
      // Send the form data to the backend API
      const response = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // Success - handle the response
        const data = await response.json();
        console.log('Account created:', data);
        // You can redirect or show a success message here
      } else {
        // Handle error
        console.error('Account creation failed');
        const errorData = await response.json();
        console.error('Error:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="account-form">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />

        <label>Role:</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="service-provider">Service Provider</option>
        </select>

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default Account;


import { useState } from 'react';
import { actions } from 'astro:actions';

export default function LoginForm () {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("formData:", formData);
    const host = import.meta.env.PUBLIC_DEFAULT_SERVER;
const port = import.meta.env.PUBLIC_DEFAULT_PORT;

     const response = await fetch(`${host}:${port}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

      console.log("Response from server:", response);
    // if (data.success) {
    //   console.log("Login successful, token:", data.token);
    //   // Handle successful login, e.g., store token, redirect, etc.
    // } else {
    //   console.error("Login failed:", error);
    //   // Handle login failure, e.g., show error message to user
    // }
  }

  const handleChange = (event) => {
    event.preventDefault();
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }
  return (
  <>
    <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input 
            type="text" 
            name="username" 
            value={formData.username} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit">Sign In</button>
    </form>
  </>  
  )
}
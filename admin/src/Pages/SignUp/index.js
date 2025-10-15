import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Signup</h2>
        <form>
          <label>Name</label>
          <input type="text" placeholder="Enter your name" />

          <label>Email</label>
          <input type="email" placeholder="Enter your email" />

          <label>Password</label>
          <input type="password" placeholder="Create a password" />

          <button type="submit">Signup</button>
        </form>

        <p style={{ marginTop: "15px", textAlign: "center" }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
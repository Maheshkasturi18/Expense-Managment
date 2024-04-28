import { React, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleonChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const resetFormData = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  // create data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/users/register", formData);
      const { success, message } = response.data;

      if (success) {
        alert(message); 
        navigate("/login");
        resetFormData();
      } else {
        alert("Registration failed: " + message); 
      }
    } catch (error) {
      // console.error("Registration failed:", error);
      alert("Registeration Failed. User already Registered !!!");
    }
  };



  return (
    <section className="container">
      <div className="d-flex justify-content-center align-items-center">
        <form
          action="/"
          onSubmit={handleSubmit}
          className="p-4 border-1 border-black"
        >
          <div className="d-grid mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleonChange}
              value={formData.name}
              className="p-1"
              required
            />
          </div>
          <div className="d-grid mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="p-1"
              onChange={handleonChange}
              value={formData.email}
              required
            />
          </div>
          <div className="d-grid mb-4">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="p-1"
              value={formData.password}
              onChange={handleonChange}
              required
            />
          </div>
          <div className="text-end mb-3">
            <button className="btn btn-success">Register</button>
          </div>

          <p className="m-0 text-secondary text-center">
            Already have an account?
            <Link to="/login" className="link-primary text-decoration-none">
              LogIn
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

import { React, useState , useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

  // create data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/users/login", formData);
      const { success, message ,data} = response.data;

      if (success) {
        alert(message);
        localStorage.setItem(
          "user",
          JSON.stringify({ ...data, password: "" })
        );
        navigate("/");
      } else {
        alert(message);
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      alert("An error occurred during login. Please try again later.");
    }
  };


  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);


  return (
    <section className="container">
      <div className="d-flex justify-content-center align-items-center">
        <form
          action="/"
          onSubmit={handleSubmit}
          className="p-4 border-1 border-black"
        >
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
            <button className="btn btn-success">LogIn</button>
          </div>

          <p className="m-0 text-secondary text-center">
            Don't have an account?
            <Link to="/register" className="link-primary text-decoration-none">
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

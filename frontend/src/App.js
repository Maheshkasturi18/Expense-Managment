import "./App.css";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Sidebar from "./Components/Sidebar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Sidebar />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export function ProtectedRoutes(props) {
  if (localStorage.getItem("users")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default App;

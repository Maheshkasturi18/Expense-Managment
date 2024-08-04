import React from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Sidebar />}></Route>
      </Routes>
    </Router>
  );
}


export default App;

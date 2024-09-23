import { React, useState, useEffect } from "react";
import axios from "axios";
import { Form } from "./Form";
import { Link } from "react-router-dom";
import { Analytics } from "./Analytics";
import { useAuth0 } from "@auth0/auth0-react";

axios.defaults.baseURL = "https://expense-managment-clqt.onrender.com/";

export default function Sidebar() {
  // auth0
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [viewData, setViewData] = useState("table");
  const [formData, setFormData] = useState({
    amount: "",
    type: "",
    date: "",
    category: "",
    refrence: "",
  });
  const [formDataEdit, setFormDataEdit] = useState({
    amount: "",
    type: "",
    date: "",
    category: "",
    refrence: "",
    email: "",
    userEmail: "",
  });

  const [dataList, setDataList] = useState([]);
  const [filter, setFilter] = useState("Default");
  const [filteredData, setFilteredData] = useState([]);

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
      amount: "",
      type: "",
      date: "",
      category: "",
      refrence: "",
    });
  };

  // create data
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const user = JSON.parse(localStorage.getItem("user"));
    try {
      const formDataWithUserEmail = { ...formData, userEmail: user.email };
      const data = await axios.post("/create", formDataWithUserEmail);
      if (data.data.success) {
        setAddSection(false);
        alert(data.data.message);
        getFetchData();
        console.log("data", data);
        resetFormData();
      }
    } catch (error) {
      console.log(error);
      alert("Fetching issue");
    }
  };

  // get data
  const getFetchData = async () => {
    try {
      const response = await axios.get("/", {
        params: { userEmail: user.email },
      });
      if (response.data.success) {
        setDataList(response.data.data);
        setFilteredData(response.data.data);
        console.log(response.data.data);
      }
    } catch (err) {
      console.log(err);
      alert("Fetching issue");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      getFetchData();
    }
  }, [isAuthenticated]);

  // delete
  const handleDelete = async (userEmail) => {
    try {
      const response = await axios.delete(`/delete/${userEmail}`);
      if (response.data.success) {
        getFetchData();
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Fetching issue");
    }
  };

  // update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("/update", formDataEdit);
      if (response.data.success) {
        getFetchData();
        alert(response.data.message);
        console.log("updated", response.data);
        setEditSection(false);
      }
    } catch (error) {
      console.log(error);
      alert("Fetching issue");
    }
  };

  const handleEditonChange = async (e) => {
    const { value, name } = e.target;
    setFormDataEdit((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleEdit = (el) => {
    setFormDataEdit(el);
    setEditSection(true);
  };

  const handlebutton = () => {
    setAddSection(true);
  };

  // auth0
  // const userName = user.name || user.nickname || "User";

  // filter logic
  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);
    applyFilter(selectedFilter);
  };

  // Apply filter logic based on the selected option
  const applyFilter = (selectedFilter) => {
    const now = new Date();
    let filtered = dataList;

    if (selectedFilter === "last 1 week") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(now.getDate() - 7);
      filtered = dataList.filter((item) => new Date(item.date) >= oneWeekAgo);
    } else if (selectedFilter === "last 1 month") {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(now.getMonth() - 1);
      filtered = dataList.filter((item) => new Date(item.date) >= oneMonthAgo);
    } else if (selectedFilter === "last 1 year") {
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(now.getFullYear() - 1);
      filtered = dataList.filter((item) => new Date(item.date) >= oneYearAgo);
    } else {
      filtered = dataList;
    }

    setFilteredData(filtered);
  };

  return (
    <div className="container-fluid bg-green overflow-auto">
      <div className="row flex-nowrap p-lg-3 p-md-2 p-1 gap-1">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-gold ">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-lg-3 px-2 pt-2 text-white min-vh-94">
            <Link
              to="/"
              className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 d-none d-md-block text-black fw-semibold">
                E<span className="text-danger">x</span>pense Tracker
              </span>

              <span className="fs-5 d-md-none d-block text-black fw-semibold">
                E<span className="text-danger">T</span>
              </span>
            </Link>
            <ul
              className="nav nav-pills flex-column mb-auto   mt-2 align-items-center align-items-sm-start"
              id="menu"
            >
              <li>
                <ul
                  className="collapse show nav flex-column ms-1"
                  id="submenu1"
                  data-bs-parent="#menu"
                >
                  <li className="w-100">
                    <h6
                      className={`nav-link px-0 ${
                        viewData === "table" ? "active-icon" : "inactive-icon"
                      }`}
                      onClick={() => {
                        setViewData("table");
                      }}
                    >
                      <i className="fa-solid fa-table-columns "></i>
                      <span className="d-none d-sm-inline  ms-2 fw-semibold">
                        Dashboard
                      </span>
                    </h6>
                  </li>
                  <li>
                    <h6
                      className={`nav-link px-0 ${
                        viewData === "chart" ? "active-icon" : "inactive-icon"
                      }`}
                      onClick={() => {
                        setViewData("chart");
                      }}
                    >
                      <i className="fa-solid fa-chart-line "></i>
                      <span className="d-none d-sm-inline ms-2 fw-semibold">
                        Chart
                      </span>
                    </h6>
                  </li>
                </ul>
              </li>

              {isAuthenticated ? (
                <li>
                  <button
                    className=" btn px-0"
                    onClick={() =>
                      logout({
                        logoutParams: { returnTo: window.location.origin },
                      })
                    }
                  >
                    <i className="fa-solid fa-power-off text-danger"></i>
                    <span className="d-none d-sm-inline text-black ms-2 fw-semibold">
                      Log Out
                    </span>
                  </button>
                </li>
              ) : (
                <li>
                  <button
                    className=" btn px-0"
                    onClick={() => loginWithRedirect()}
                  >
                    <i className="fa-solid fa-power-off text-danger"></i>
                    <span className="d-none d-sm-inline text-black ms-2 fw-semibold">
                      Log In
                    </span>
                  </button>
                </li>
              )}
            </ul>

            {isAuthenticated && (
              <div className="pb-4">
                <Link
                  to="/"
                  className="d-flex align-items-center text-white text-decoration-none "
                  aria-expanded="false"
                >
                  <img
                    src="man.png"
                    alt="login-icon"
                    width="40"
                    height="40"
                    className="rounded-circle"
                  />
                  <span className="d-none d-sm-inline mx-1 text-black fw-semibold">
                    {user.nickname}
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="col ms-lg-3 ms-md-2 px-md-4 px-2 py-3 content  scrollable">
          <div className="d-flex justify-content-between align-items-center">
            <select
              name=""
              id=""
              className="bg-transparent p-1 p-md-2 filter"
              value={filter}
              onChange={handleFilterChange}
            >
              <option value="Default">Default</option>
              <option value="last 1 week">last 1 week</option>
              <option value="last 1 month">last 1 month</option>
              <option value="last 1 year">last 1 year</option>
            </select>

            <button
              className="btn px-3 py-1 border border-2 border-white  rounded-4"
              onClick={handlebutton}
            >
              Add
            </button>
          </div>

          {/* modal - form */}
          {addSection && (
            <Form
              handleSubmit={handleSubmit}
              handleonChange={handleonChange}
              handleClose={() => setAddSection(false)}
              rest={formData}
            />
          )}

          {editSection && (
            <Form
              handleSubmit={handleUpdate}
              handleonChange={handleEditonChange}
              handleClose={() => setEditSection(false)}
              rest={formDataEdit}
            />
          )}

          {/*  */}

          {viewData === "table" ? (
            <div className="tableContainer overflow-auto">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Reference</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                {isAuthenticated ? (
                  <tbody>
                    {filteredData.length > 0 ? (
                      filteredData.map((el) => (
                        <tr key={el.id}>
                          <td>{el.date}</td>
                          <td>{el.amount}</td>
                          <td>{el.type}</td>
                          <td>{el.category}</td>
                          <td>{el.refrence}</td>
                          <td>
                            <button className="bg-transparent border-0 text-primary">
                              <i
                                className="fa-solid fa-pen"
                                onClick={() => handleEdit(el)}
                              ></i>
                            </button>
                            <button className="bg-transparent border-0 text-danger">
                              <i
                                className="fa-solid fa-trash"
                                onClick={() => handleDelete(el.userEmail)}
                              ></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <p className="text-center">No data available</p>
                    )}
                  </tbody>
                ) : (
                  <div style={{ textAlign: "center" }}>Login to see data</div>
                )}
              </table>
            </div>
          ) : (
            <Analytics filteredData={filteredData} />
          )}
        </div>
      </div>
    </div>
  );
}

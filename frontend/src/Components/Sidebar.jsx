import { React, useState, useEffect } from "react";
import axios from "axios";
import { Form } from "./Form";
import { Link } from "react-router-dom";
import { Analytics } from "./Analytics";
import { useAuth0 } from "@auth0/auth0-react";
import CountUp from "react-countup";

axios.defaults.baseURL =
  "https://expense-managment-clqt.onrender.com/" || "http://localhost:8090/";

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
  const [typeFilter, setTypeFilter] = useState("allType");
  const [catFilter, setCatFilter] = useState("Default");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

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
        // console.log("data sent", data);
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
        // console.log("data received",response.data.data);
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

  // console.log("datalist", dataList);

  // calc. of total transactions
  const totalTransaction = dataList.length;
  // console.log("totalTransaction", totalTransaction);
  // calc. of total income
  const totalIncome = dataList
    .filter((item) => item.type === "Income")
    .reduce((acc, totalprice) => acc + totalprice.amount, 0);
  // console.log("totalIncome", totalIncome);
  // calc. of total expense
  const totalExpense = dataList
    .filter((item) => item.type === "Expense")
    .reduce((acc, totalprice) => acc + totalprice.amount, 0);
  // console.log("totalExpense", totalExpense);
  // calc. of current balance
  const currentBalance = totalIncome - totalExpense;
  // console.log("currentBalance", currentBalance);

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
        // console.log("updated", response.data);
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

    switch (selectedFilter) {
      case "last 1 week":
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(now.getDate() - 7);
        filtered = dataList.filter((item) => new Date(item.date) >= oneWeekAgo);
        break;
      case "last 1 month":
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(now.getMonth() - 1);
        filtered = dataList.filter(
          (item) => new Date(item.date) >= oneMonthAgo
        );
        break;
      case "last 1 year":
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(now.getFullYear() - 1);
        filtered = dataList.filter((item) => new Date(item.date) >= oneYearAgo);
        break;
      default:
        filtered = dataList;
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  };

  // type filter logic
  const handletypeFilterChange = (event) => {
    const selectedtypeFilter = event.target.value;
    setTypeFilter(selectedtypeFilter);
    applytypeFilter(selectedtypeFilter);
  };

  const applytypeFilter = (selectedtypeFilter) => {
    let filtered = dataList;

    switch (selectedtypeFilter) {
      case "income":
        filtered = dataList.filter((item) => item);
        break;
      case "expense":
        filtered = dataList.filter((item) => item);
        break;
      default:
        filtered = dataList;
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  };

  // category filter logic
  const handlecatFilterChange = (event) => {
    const selectedcatFilter = event.target.value;
    setCatFilter(selectedcatFilter);
    applycatFilter(selectedcatFilter);
  };

  const applycatFilter = (selectedcatFilter) => {
    let filtered = dataList;

    switch (selectedcatFilter) {
      case "income":
        filtered = dataList.filter((item) => item);
        break;
      case "expense":
        filtered = dataList.filter((item) => item);
        break;
      default:
        filtered = dataList;
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  // Calculate the rows to be displayed on the current page
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  // console.log("currentData", currentData);

  // Handle next and previous page buttons
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // console.log("setDataList", setDataList);
  // console.log("setFilteredData", setFilteredData);

  return (
    <div className="container-fluid overflow-auto h-100vh">
      <div className="row flex-nowrap h-init border-r-4 ">
        {/* Sidebar */}
        <div className="col-auto col-md-3 col-xl-2 py-3 px-2 px-md-3 border-end ">
          <div className="d-flex flex-column align-items-center align-items-sm-start  text-white max-height gap-4">
            {/* logo */}
            <Link
              to="/"
              className="d-flex align-items-center mb-md-0 w-100 text-white text-decoration-none"
            >
              {/* Desktop */}
              <span className="fs-5 d-none d-md-block text-black fw-semibold">
                E
                <span className="text-danger">
                  <i className="fa-brands fa-xing"></i>
                </span>
                pense Tracker
              </span>

              {/* mobile */}
              <span className="fs-5 d-md-none d-block text-black fw-semibold">
                <span className="text-danger">
                  <i className="fa-brands fa-xing"></i>
                </span>
                T
              </span>
            </Link>

            {/* Routes */}
            <ul
              className="nav nav-pills flex-column mb-auto align-items-center gap-2 align-items-sm-start w-100"
              id="menu"
            >
              {/* Dashboard & Analytics Page Routes */}
              <li className="w-100">
                <ul
                  className="collapse show nav flex-column gap-2"
                  id="submenu1"
                  data-bs-parent="#menu"
                >
                  <li>
                    <h6
                      className={`nav-link px-2 ${
                        viewData === "table" ? "active-icon" : "inactive-icon"
                      }`}
                      onClick={() => {
                        setViewData("table");
                      }}
                    >
                      <i className="fa-solid fa-table-columns"></i>
                      <span className="d-none d-sm-inline  ms-2 fw-semibold">
                        Dashboard
                      </span>
                    </h6>
                  </li>
                  <li>
                    <h6
                      className={`nav-link px-2 ${
                        viewData === "chart" ? "active-icon" : "inactive-icon"
                      }`}
                      onClick={() => {
                        setViewData("chart");
                      }}
                    >
                      <i className="fa-solid fa-chart-line "></i>
                      <span className="d-none d-sm-inline ms-2 fw-semibold">
                        Analytics
                      </span>
                    </h6>
                  </li>
                </ul>
              </li>

              {/* logout -- login btns */}
              {isAuthenticated ? (
                <li className="w-100">
                  <button
                    className=" btn px-2"
                    onClick={() =>
                      logout({
                        logoutParams: { returnTo: window.location.origin },
                      })
                    }
                  >
                    <i className="fa-solid fa-power-off text-danger"></i>
                    <span className="d-none d-sm-inline text-black ms-2 fw-semibold">
                      Sign Out
                    </span>
                  </button>
                </li>
              ) : (
                <li className="w-100">
                  <button
                    className="btn px-2"
                    onClick={() => loginWithRedirect()}
                  >
                    <i className="fa-solid fa-power-off text-danger"></i>
                    <span className="d-none d-sm-inline text-black ms-2 fw-semibold">
                      Sign In
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
                    src="user-icon.png"
                    alt="user-icon"
                    width="25"
                    height="25"
                  />
                  <span className="d-none d-sm-inline mx-1 text-black fw-semibold">
                    {user.nickname}
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Main Page */}
        <div className="col px-md-4 px-2  py-3  scrollable bg-f7">
          {/* add new transaction btn */}
          {isAuthenticated && (
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="m-0">
                {viewData === "table" ? "Dashboard" : "Analytics"}
              </h4>

              <button
                className="btn px-2 px-md-3 py-1 border border-0 box-shadow-sm rounded-2 bg-white"
                onClick={handlebutton}
              >
                <i className="fa-solid fa-plus me-1 me-md-2 fw-normal"></i> Add
                New
              </button>
            </div>
          )}

          {/* add modal - form */}
          {addSection && (
            <Form
              handleSubmit={handleSubmit}
              handleonChange={handleonChange}
              handleClose={() => setAddSection(false)}
              rest={formData}
            />
          )}

          {/* edit modal - form */}
          {editSection && (
            <Form
              handleSubmit={handleUpdate}
              handleonChange={handleEditonChange}
              handleClose={() => setEditSection(false)}
              rest={formDataEdit}
            />
          )}

          {/* dynamically rendering pages, onload Dashbaord table is visible */}

          {isAuthenticated ? (
            viewData === "table" ? (
              // dashboard page
              <div className="tableContainer overflow-hidden p-md-2">
                {/* dashboard overview */}
                <div className="row gap-3 gap-lg-4 mb-5 mx-lg-2">
                  <div className="d-flex flex-row gap-3 flex-md-column col-12 col-md-4 col-lg-2 flex-grow-1 bg-white px-4 py-3 rounded-2 table-box-shadow">
                    <div>
                      <i class="fa-solid fa-book p-3 bg-warning-subtle text-warning rounded-3"></i>
                    </div>
                    <div>
                      <h6 className="text-secondary fs-13 mb-2">
                        Total Transactions
                      </h6>
                      <h4>
                        <CountUp
                          start={0}
                          end={totalTransaction}
                          duration={2.75}
                          separator=" "
                        />
                      </h4>
                    </div>
                  </div>
                  <div className="d-flex flex-row gap-3 flex-md-column col-12 col-md-4 col-lg-2 flex-grow-1 bg-white px-4 py-3 rounded-2 table-box-shadow">
                    <div>
                      <i className="fa-solid fa-indian-rupee-sign p-3 bg-primary-subtle text-primary rounded-3"></i>
                    </div>
                    <div>
                      <h6 className="text-secondary fs-13 mb-2">
                        Current Balance
                      </h6>
                      <h4>
                        <CountUp
                          start={0}
                          end={currentBalance}
                          duration={2.75}
                          separator=","
                          decimal="."
                          prefix="₹"
                        />
                      </h4>
                    </div>
                  </div>
                  <div className="d-flex flex-row gap-3 flex-md-column col-12 col-md-4 col-lg-2 flex-grow-1 bg-white px-4 py-3 rounded-2 table-box-shadow">
                    <div>
                      <i className="fa-solid fa-arrow-trend-up p-3 bg-success-subtle rounded-3 text-success"></i>
                    </div>
                    <div>
                      <h6 className="text-secondary fs-13 mb-2">Income</h6>
                      <h4>
                        <CountUp
                          start={0}
                          end={totalIncome}
                          duration={2.75}
                          separator=","
                          decimal="."
                          prefix="₹"
                        />
                      </h4>
                    </div>
                  </div>
                  <div className="d-flex flex-row gap-3 flex-md-column col-12 col-md-4 col-lg-2 flex-grow-1 bg-white px-4 py-3 rounded-2 table-box-shadow">
                    <div>
                      <i className="fa-solid fa-arrow-trend-down p-3 bg-danger-subtle text-danger rounded-3"></i>
                    </div>
                    <div>
                      <h6 className="text-secondary fs-13 mb-2">Expenses</h6>
                      <h4>
                        {" "}
                        <CountUp
                          start={0}
                          end={totalExpense}
                          duration={2.75}
                          separator=","
                          decimal="."
                          prefix="₹"
                        />
                      </h4>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2 table-box-shadow">
                  {/* Sort Filter */}
                  <div className="d-flex flex-wrap gap-2 gap-md-4 justify-content-md-end align-items-center p-4 border-bottom">
                    <select
                      name="typeFilter"
                      id="typeFilter"
                      className="px-2 py-1 border border-0 rounded-2 bg-f7 flex-grow-1 flex-md-grow-0"
                      value={typeFilter}
                      onChange={handletypeFilterChange}
                    >
                      <option value="allType">All Types</option>
                      <option value="income">Income</option>
                      <option value="expense">Expense</option>
                    </select>

                    <select
                      name="catFilter"
                      id="catFilter"
                      className="px-2 py-1 border border-0 rounded-2 bg-f7 flex-grow-1 flex-md-grow-0"
                      value={catFilter}
                      onChange={handlecatFilterChange}
                    >
                      <option value="Default">All Categories</option>
                      <option value="Salary">Salary</option>
                      <option value="Investment">Investment</option>
                      <option value="Stocks">Stocks</option>
                      <option value="Fees">Fees</option>
                      <option value="Groceries">Groceries</option>
                      <option value="Health">Health</option>
                      <option value="Shopping">Shopping</option>
                      <option value="Food">Food</option>
                      <option value="Other">Other</option>
                    </select>

                    <select
                      name="sortFilter"
                      id="sortFilter"
                      className="px-2 py-1 border border-0 rounded-2 bg-f7 flex-grow-1 flex-md-grow-0"
                      value={filter}
                      onChange={handleFilterChange}
                    >
                      <option value="Default">Default</option>
                      <option value="last 1 week">last 1 week</option>
                      <option value="last 1 month">last 1 month</option>
                      <option value="last 1 year">last 1 year</option>
                    </select>
                  </div>

                  <div className="overflow-auto">
                    <table className="w-100">
                      <thead>
                        <tr className="bg-f7">
                          <th>DATE</th>
                          <th>CATEGORY</th>
                          <th>DESCRIPTION</th>
                          <th>AMOUNT</th>
                          <th>TYPE</th>
                          <th>ACTIONS</th>
                        </tr>
                      </thead>

                      <tbody>
                        {currentData.length > 0 ? (
                          currentData.map((el) => (
                            <tr key={el.id}>
                              <td>
                                {el.date
                                  ? new Date(el.date).toLocaleDateString(
                                      "en-GB"
                                    )
                                  : "-"}
                              </td>
                              <td>{el.category}</td>
                              <td>{el.refrence}</td>
                              <td>
                                {el.type === "Income" ? (
                                  <span className="text-success">
                                    ₹{el.amount}
                                  </span>
                                ) : (
                                  <span className="text-danger">
                                    ₹{el.amount}
                                  </span>
                                )}
                              </td>
                              <td>
                                {el.type === "Income" ? (
                                  <span className="text-success me-2">
                                    <i class="fa-solid fa-arrow-up"></i>
                                  </span>
                                ) : (
                                  <span className="text-danger me-2">
                                    <i class="fa-solid fa-arrow-down"></i>
                                  </span>
                                )}
                                {el.type}
                              </td>
                              <td>
                                <>
                                  <button className="bg-transparent border-0 text-secondary me-2 p-1">
                                    <i
                                      className="fa-solid fa-pen"
                                      onClick={() => handleEdit(el)}
                                    ></i>
                                  </button>
                                  <button className="bg-transparent border-0 text-danger p-1">
                                    <i
                                      className="fa-solid fa-trash"
                                      onClick={() => handleDelete(el.userEmail)}
                                    ></i>
                                  </button>
                                </>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="text-center">
                              <div className="mb-1 fs-1">
                                <i className="fa-regular fa-face-sad-tear"></i>
                              </div>
                              <h4>Oops!! No Data Available</h4>
                              <p>
                                Please add atleast one Data to see Dashboard
                              </p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {totalPages > 1 && (
                  <div className="pagination-controls text-center mt-5">
                    <button
                      className="btn btn-secondary"
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                    >
                      Prev
                    </button>
                    <span className="mx-2">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      className="btn btn-secondary"
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Analytics Page
              <>
                {filteredData.length > 0 ? (
                  <Analytics filteredData={filteredData} />
                ) : (
                  <div className="d-flex flex-column justify-content-center align-items-center mx-auto h-100 text-center ">
                    <div className="mb-1 fs-1">
                      <i className="fa-regular fa-face-sad-tear"></i>
                    </div>
                    <h4>Oops!! No Data Available</h4>
                    <p>Please add atleast one Data to see Analytics</p>
                  </div>
                )}
              </>
            )
          ) : (
            <div className="w-50 d-flex flex-column justify-content-center align-items-center mx-auto h-100 text-center">
              <i className="fa-solid fa-lock p-3 bg-dark-subtle mb-3 rounded-5"></i>

              <h4 className="mb-3">Unlock Your Financial Insights</h4>

              <p>
                Sign in to view your personalized dashboard, track expenses, and
                analyze your spending patterns.
              </p>

              <button
                className="btn px-3 bg-dark-subtle mt-3"
                onClick={() => loginWithRedirect()}
              >
                <span className="text-black fw-semibold">
                  Sign In to Continue
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

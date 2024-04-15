import { React, useState, useEffect } from "react";
import axios from "axios";
import { Form } from "./Form";

axios.defaults.baseURL = "http://localhost:8000/";

export default function Sidebar() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
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
  });

  const [dataList, setDataList] = useState([]);

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
    const data = await axios.post("/create", formData);
    if (data.data.success) {
      setAddSection(false);
      alert(data.data.message);
      getFetchData();
    }
  };

  // get data
  const getFetchData = async () => {
    const data = await axios.get("/");
    if (data.data.success) {
      setDataList(data.data.data);
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  // delete
  const handleDelete = async (id) => {
    const data = await axios.delete("/delete/" + id);

    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
    }
  };

  // update
  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = await axios.put("/update", formDataEdit);
    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
      setEditSection(false);
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

  return (
    <div className="container-fluid bg-green">
      <div className="row flex-nowrap p-lg-3 p-2">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-gold">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-lg-3 px-2 pt-2 text-white min-vh-94">
            <a
              href="/"
              className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 d-none d-sm-inline text-black fw-semibold">
                Expense Tracker
              </span>
            </a>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="nav-item">
                <a href="#" className="nav-link align-middle px-0">
                  <i className="fs-4 bi-house"></i>
                  <span className="ms-1 d-none d-sm-inline">Home</span>
                </a>
              </li>
              <li>
                <a
                  href="#submenu1"
                  data-bs-toggle="collapse"
                  className="nav-link px-0 align-middle"
                >
                  <i className="fs-4 bi-speedometer2"></i>
                  <span className="ms-1 d-none d-sm-inline">Dashboard</span>
                </a>
                <ul
                  className="collapse show nav flex-column ms-1"
                  id="submenu1"
                  data-bs-parent="#menu"
                >
                  <li className="w-100">
                    <a href="#" className="nav-link px-0">
                      <span className="d-none d-sm-inline">Item</span> 1
                    </a>
                  </li>
                  <li>
                    <a href="#" className="nav-link px-0">
                      <span className="d-none d-sm-inline">Item</span> 2
                    </a>
                  </li>
                </ul>
              </li>

              <li>
                <a
                  href="#submenu2"
                  data-bs-toggle="collapse"
                  className="nav-link px-0 align-middle "
                >
                  <i className="fs-4 bi-bootstrap"></i>
                  <span className="ms-1 d-none d-sm-inline">Bootstrap</span>
                </a>
                <ul
                  className="collapse nav flex-column ms-1"
                  id="submenu2"
                  data-bs-parent="#menu"
                >
                  <li className="w-100">
                    <a href="#" className="nav-link px-0">
                      <span className="d-none d-sm-inline">Item</span> 1
                    </a>
                  </li>
                  <li>
                    <a href="#" className="nav-link px-0">
                      <span className="d-none d-sm-inline">Item</span> 2
                    </a>
                  </li>
                </ul>
              </li>

              <li>
                <a href="#" className="nav-link px-0 align-middle">
                  <i className="fs-4 bi-people"></i>
                  <span className="ms-1 d-none d-sm-inline">Customers</span>
                </a>
              </li>
            </ul>

            <div className="dropdown pb-4">
              <a
                href="#"
                className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                id="dropdownUser1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://github.com/mdo.png"
                  alt="hugenerd"
                  width="30"
                  height="30"
                  className="rounded-circle"
                />
                <span className="d-none d-sm-inline mx-1">loser</span>
              </a>
              <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                <li>
                  <a className="dropdown-item" href="#">
                    New project...
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Settings
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Profile
                  </a>
                </li>
                <li></li>
                <li>
                  <a className="dropdown-item" href="#">
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col ms-lg-3 ms-2 px-4 py-3 content">
          <div className="d-flex justify-content-between align-items-center">
            <select name="" id="" className="bg-transparent  p-2 filter">
              <option value="Default">Default</option>
              <option value="last 1 week">last 1 week</option>
              <option value="last 1 month">last 1 month</option>
              <option value="last 1 year">last 1 year</option>
            </select>

            <button
              className="btn px-3 py-1"
              onClick={() => setAddSection(true)}
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

          <div className="tableContainer">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Refrence</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {dataList[0] ? (
                  dataList.map((el) => {
                    return (
                      <tr>
                        <td>{el.date}</td>
                        <td>{el.amount}</td>
                        <td>{el.type}</td>
                        <td>{el.category}</td>
                        <td>{el.refrence}</td>
                        <td>
                          <button>
                            <i
                              class="fa-solid fa-pen"
                              onClick={() => handleEdit(el)}
                            ></i>
                          </button>
                          <button>
                            <i
                              class="fa-solid fa-trash "
                              onClick={() => handleDelete(el._id)}
                            ></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <p className="texxt-center">NO data</p>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

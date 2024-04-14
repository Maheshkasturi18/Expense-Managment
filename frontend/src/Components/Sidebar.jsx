import React from "react";
// import { Link } from "react";

export default function Sidebar() {
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
              type="button"
              className="btn px-3 py-1"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              Add
            </button>
          </div>

          {/* modal - form */}
          <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header border-0 p-2">
                  <button
                    type="button"
                    className="btn-close border-0 "
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form action="">
                    <div className="mb-3 d-grid">
                      <label htmlFor="amount" className="mb-2">
                        Amount
                      </label>
                      <input type="text" name="amount" className="p-1"/>
                    </div>

                    <div className="mb-3 d-grid">
                      <label htmlFor="type" className="mb-2">
                        Type
                      </label>
                      <select name="type" id="" type="text" className="p-1">
                        <option value="">Select</option>
                        <option value="">Income</option>
                        <option value="">Expense</option>
                      </select>
                    </div>

                    <div className="mb-3 d-grid">
                      <label htmlFor="date" className="mb-2">
                        Date
                      </label>
                      <input type="date" name="date" id="" className="p-1"/>
                    </div>

                    <div className="mb-3 d-grid">
                      <label htmlFor="category" className="mb-2">
                        Category
                      </label>
                      <select name="category" id="" type="text" className="p-1">
                        <option value="">Select</option>
                        <option value="">Salary</option>
                        <option value="">Investment</option>
                        <option value="">Stocks</option>
                        <option value="">Fees</option>
                        <option value="">Groceries</option>
                        <option value="">Health</option>
                        <option value="">Shopping</option>
                        <option value="">Food</option>
                        <option value="">other</option>
                      </select>
                    </div>

                    <div className="mb-3 d-grid">
                      <label htmlFor="reference" className="mb-2">
                        Reference
                      </label>
                      <input type="text" placeholder="Add a reference" className="p-1"/>
                    </div>
                  </form>
                </div>

                <div className="modal-footer border-0 p-2">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/*  */}
        </div>
      </div>
    </div>
  );
}

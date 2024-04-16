import React from "react";

export const Form = ({ handleSubmit, handleonChange, handleClose, rest }) => {
  return (
    <div className="form-popup d-block" id="myForm ">
      <form action="/" onSubmit={handleSubmit} className="p-lg-3 p-md-2 bg-white ">
        <div className="border-0 ">
          <button
            type="button"
            className="btn-close border-0 "
            onClick={handleClose}
          ></button>
        </div>
        <div>
          <div className="mb-lg-3 mb-md-2 mb-1 d-grid">
            <label htmlFor="amount" className="mb-lg-2 mb-1">
              Amount
            </label>
            <input
              type="text"
              id="amount"
              name="amount"
              className="p-1"
              onChange={handleonChange}
              value={rest.amount}
              required
            />
          </div>

          <div className="mb-lg-3 mb-md-2 mb-1 d-grid">
            <label htmlFor="type" className="mb-lg-2 mb-1">
              Type
            </label>
            <select
              name="type"
              id="type"
              type="text"
              className="p-1"
              required
              onChange={handleonChange}
              value={rest.type}
            >
              <option value="">Select</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>

          <div className="mb-lg-3 mb-2  d-grid">
            <label htmlFor="date" className="mb-lg-2 mb-1">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className="p-1"
              required
              onChange={handleonChange}
              value={rest.date}
            />
          </div>

          <div className="mb-lg-3 mb-md-2 mb-1 d-grid">
            <label htmlFor="category" className="mb-lg-2 mb-1">
              Category
            </label>
            <select
              name="category"
              id="category"
              type="text"
              className="p-1"
              required
              onChange={handleonChange}
              value={rest.category}
            >
              <option value="">Select</option>
              <option value="Salary">Salary</option>
              <option value="Investment">Investment</option>
              <option value="Stocks">Stocks</option>
              <option value="Fees">Fees</option>
              <option value="Groceries">Groceries</option>
              <option value="Health">Health</option>
              <option value="Shopping">Shopping</option>
              <option value="Food">Food</option>
              <option value="other">other</option>
            </select>
          </div>

          <div className="mb-lg-3 mb-md-2 mb-1 d-grid">
            <label htmlFor="refrence" className="mb-lg-2 mb-1">
              Refrence
            </label>
            <input
              type="text"
              name="refrence"
              id="refrence"
              placeholder="Add a refrence"
              className="p-1"
              required
              onChange={handleonChange}
              value={rest.refrence}
            />
          </div>
        </div>

        <div className="d-grid justify-content-end align-items-center ">
          <button type="submit" className="btn btn-secondary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

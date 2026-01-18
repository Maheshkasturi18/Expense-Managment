import React from "react";

export const Form = ({ handleSubmit, handleonChange, handleClose, rest }) => {
  return (
    <div className="form-container">
      <div className="form-popup d-block" id="myForm ">
        <h5 className="mb-0 px-lg-4 px-3 py-3">Add Transaction</h5>
        <form
          action="/"
          onSubmit={handleSubmit}
          className="p-lg-4 p-3 border-top border-secondary-subtle"
        >
          <button
            type="button"
            className="btn-close border-0 "
            onClick={handleClose}
          ></button>
          <div>
            <div className="mb-lg-3 mb-md-2 mb-1 d-grid">
              <label htmlFor="amount" className=" mb-1">
                Amount (₹)
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                min="1"
                max="100000000"
                placeholder="Enter your Amount in ₹"
                className="px-2 py-1 m-0"
                onChange={handleonChange}
                value={rest.amount}
                required
              />
            </div>

            <div className="mb-lg-3 mb-md-2 mb-1 d-grid">
              <label htmlFor="type" className=" mb-1">
                Type
              </label>
              <select
                name="type"
                id="type"
                type="text"
                className="px-2 py-1 m-0"
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
              <label htmlFor="date" className=" mb-1">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className="px-2 py-1 m-0"
                required
                onChange={handleonChange}
                value={rest.date}
              />
            </div>

            <div className="mb-lg-3 mb-md-2 mb-1 d-grid">
              <label htmlFor="category" className=" mb-1">
                Category
              </label>
              <select
                name="category"
                id="category"
                type="text"
                className="px-2 py-1 m-0"
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

            <div className="mb-lg-3 mb-2 d-grid">
              <label htmlFor="refrence" className=" mb-1">
                Reference
              </label>
              <input
                type="text"
                name="refrence"
                id="refrence"
                placeholder="Description or Reference"
                className="px-2 py-1 m-0"
                required
                onChange={handleonChange}
                value={rest.refrence}
              />
            </div>
          </div>

          <div className="d-flex gap-3 justify-content-end align-items-center mt-4">
            <button
              type="button"
              onClick={handleClose}
              className="btn btn-danger"
            >
              Cancel
            </button>

            <button type="submit" className="btn btn-secondary">
              Save Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

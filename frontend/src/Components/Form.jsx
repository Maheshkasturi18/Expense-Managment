import React from "react";

export const Form = ({ handleSubmit, handleonChange, handleClose, rest }) => {
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <i
          className="fa-regular fa-circle-xmark  ms-auto"
          onClick={handleClose}
        ></i>
        <div className="mb-3 d-grid">
          <label htmlFor="amount" className="mb-2">
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

        <div className="mb-3 d-grid">
          <label htmlFor="type" className="mb-2">
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

        <div className="mb-3 d-grid">
          <label htmlFor="date" className="mb-2">
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

        <div className="mb-3 d-grid">
          <label htmlFor="category" className="mb-2">
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

        <div className="mb-3 d-grid">
          <label htmlFor="refrence" className="mb-2">
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

        <button className="btn btn-secondary">Save</button>
      </form>
    </div>
  );
};

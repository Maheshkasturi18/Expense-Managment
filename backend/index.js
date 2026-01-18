const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
app.use(cors());
app.use(express.json());
const PORT = process.env.Port || 8090;
require("dotenv").config();

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongo is connected");
  })
  .catch((err) => console.error(err));

// Schema for Expense Data of users
const ExpenseSchema = new mongoose.Schema(
  {
    userEmail: String,
    amount: Number,
    type: String,
    date: String,
    category: String,
    refrence: String,
  },
  {
    timestamps: true,
  }
);

const expenseModel = mongoose.model("expenses", ExpenseSchema);

app.get("/working", (req, res) => {
  res.send("Hello from the backend");
});

// read data
app.get("/", async (req, res) => {
  try {
    const { userEmail } = req.query;
    if (!userEmail) {
      return res.status(400).json({ error: "userEmail is required" });
    }
    const expenses = await expenseModel.find({ userEmail });
    res.json({ success: true, data: expenses });
  } catch (err) {
    console.error(err);
    res.status(400).json({ err: "Error fetching data" });
  }
});

// create data
app.post("/create", async (req, res) => {
  try {
    const data = new expenseModel(req.body);
    await data.save();
    res.json({ success: true, message: "Data saved successfully", data: data });
  } catch (err) {
    console.error(err);
    res.status(400).json({ err: "Error saving data" });
  }
});

// update data
app.put("/update", async (req, res) => {
  try {
    const { userEmail, ...rest } = req.body;
    const data = await expenseModel.findOneAndUpdate({ userEmail }, rest, {
      new: true,
    });
    res.json({
      success: true,
      message: "Data updated successfully",
      data: data,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ err: "Error updating data" });
  }
});

// delete data
app.delete("/delete/:userEmail", async (req, res) => {
  try {
    const { userEmail } = req.params;
    const data = await expenseModel.deleteOne({ userEmail });
    res.json({
      success: true,
      message: "Data deleted successfully",
      data: data,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ err: "Error deleting data" });
  }
});

// listen port
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

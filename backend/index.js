const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
app.use(cors());
app.use(express.json());
const PORT = process.env.Port || 8000;
require("dotenv").config();

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("mongo is connected");
  })
  .catch((err) => console.error(err));

//
//
//
// Schema for Expense Data of users
const ExpenseSchema = new mongoose.Schema(
  {
    userid: String,
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

// read data
app.get("/", async (req, res) => {
  try {
    const data = await expenseModel.find({ userid: req.query.userid });
    res.json({ success: true, data: data });
  } catch (err) {
    console.error(err);
    res.status(400).json({ err: "Error fetching data" });
  }
});

// create data
app.post("/create", async (req, res) => {
  console.log(req.body);
  const data = new expenseModel(req.body);
  await data.save();
  res.json({ success: true, message: "Data saved successfully", data: data });
});

// update data
app.put("/update", async (req, res) => {
  console.log(req.body);
  const { id, ...rest } = req.body;
  const data = await expenseModel.updateOne({ _id: id }, rest);
  res.json({ success: true, message: "Data update successfully", data: data });
});

// delete data
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const data = await expenseModel.deleteOne({ _id: id });
  res.json({ success: true, message: "Data deleted successfully", data: data });
});
//
//
//
//

// Login/register users schema
//
//
const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);
const userModel = mongoose.model("users", UserSchema);

app.get("/api/users", async (req, res) => {
  const user = await userModel.find({});
  res.json({ success: true, data: user });
});

// create data for login
app.post("/api/users/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email, password });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    res.json({
      success: true,
      message: "User logged-in successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred during login. Please try again later.",
    });
  }
});

// create data for register
app.post("/api/users/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }

    const newUser = new userModel({ name, email, password });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "User logged-in successfully",
      data: newUser,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.json({
      success: true,
      message: "User registered successfully",
      data: newUser,
    });
  }
});

// listen port
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

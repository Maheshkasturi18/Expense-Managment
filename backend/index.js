const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
app.use(cors());
app.use(express.json());
const PORT = process.env.Port || 8000;
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

// app.get("/api/users", async (req, res) => {
//   const user = await userModel.find({});
//   res.json({ success: true, data: user });
// });

// app.get("/api/users", async (req, res) => {
//   try {
//     const user = await userModel.findOne({ auth0Id: req.user.sub });
//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }
//     res.json({ success: true, data: user });
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//     res.status(500).json({
//       success: false,
//       message:
//         "An error occurred while fetching user data. Please try again later.",
//     });
//   }
// });

// app.post("/api/users/auth", async (req, res) => {
//   try {
//     const { sub: auth0Id, name, email } = req.user;

//     let user = await userModel.findOne({ auth0Id });

//     if (!user) {
//       user = new userModel({ name, email, auth0Id });
//       await user.save();
//     } else {
//       user.name = name || user.name;
//       user.email = email || user.email;
//       await user.save();
//     }

//     res.status(200).json({
//       success: true,
//       message: "User authenticated successfully",
//       data: user,
//     });
//   } catch (error) {
//     console.error("Error during authentication:", error);
//     res.status(500).json({
//       success: false,
//       message:
//         "An error occurred during authentication. Please try again later.",
//     });
//   }
// });

// listen port
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
